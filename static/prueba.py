import requests
import json
import http.client
import urllib.parse
import io
import pdfplumber

# Parse TRIGGER_INPUT
trigger_data = json.loads(TRIGGER_INPUT)
pdf_urls = trigger_data["pdf_urls"]
question = trigger_data["question"]

all_text = []

for url in pdf_urls:
  if not url or url.lower() == "none":
    continue
  parsed = urllib.parse.urlparse(url)
  conn = http.client.HTTPSConnection(parsed.hostname, context=sslContext)
  path = parsed.path or "/"
  if parsed.query:
    path += "?" + parsed.query
  conn.request("GET", path)
  resp = conn.getresponse()
  if resp.status != 200:
    conn.close()
    continue
  pdf_bytes = resp.read()
  conn.close()
  with pdfplumber.open(io.BytesIO(pdf_bytes)) as pdf:
    for page in pdf.pages:
      text = page.extract_text()
      if text:
        all_text.append(text)

result = {
  "pdf_text": "\n".join(all_text),
  "question": question
}

print(json.dumps(result))
# Step 1: uploadFile helper (returns { url, fileName, type })
def upload_file(path, user_id, loop_id):
    with open(path, 'rb') as f:
        res = requests.post(f'https://magicloops.dev/api/loop/{loop_id}/upload', files={'file': f})
    return res.json()['url']

# Step 2: upload all files and collect results
files = [upload_file(p, 'b0a77adb-d5f4-4a25-974b-0604c96891bc') for p in ['file1.jpg', 'file2.jpg']]

# Step 3: Trigger your loop with the file references
payload = {
  'pdf_urls': [
    files[0].url,
    files[1].url
  ],
  'question': 'What are the main findings in these reports?'
}
result = requests.post('https://magicloops.dev/api/loop/b0a77adb-d5f4-4a25-974b-0604c96891bc/run', json=payload).json()
print(result)