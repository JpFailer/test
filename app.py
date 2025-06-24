#!/usr/bin/env python3
"""
Servidor web simple para Fundacredesa
"""
import http.server
import socketserver
import os
import sys
from pathlib import Path
import mimetypes
import urllib.parse
import json

class FundacredesaHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory='.', **kwargs)

    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')

        # Cache control for different file types
        if self.path.endswith(('.css', '.js')):
            self.send_header('Cache-Control', 'public, max-age=86400')
        elif self.path.endswith(('.png', '.jpg', '.jpeg', '.gif', '.ico')):
            self.send_header('Cache-Control', 'public, max-age=31536000')
        else:
            self.send_header('Cache-Control', 'no-cache')

        super().end_headers()

    def do_GET(self):
        # Parse the URL
        parsed_path = urllib.parse.urlparse(self.path)
        path = parsed_path.path

        # Remove leading slash and handle root
        if path == '/':
            path = 'index.html'
        else:
            path = path.lstrip('/')

        # Security check - prevent directory traversal
        if '..' in path or path.startswith('/'):
            self.send_error(404, "File not found")
            return

        file_path = Path(path)

        # Check if file exists
        if not file_path.exists() or not file_path.is_file():
            self.send_error(404, "File not found")
            return

        # Get MIME type
        mime_type, _ = mimetypes.guess_type(str(file_path))
        if mime_type is None:
            if file_path.suffix == '.css':
                mime_type = 'text/css'
            elif file_path.suffix == '.js':
                mime_type = 'application/javascript'
            elif file_path.suffix == '.html':
                mime_type = 'text/html'
            else:
                mime_type = 'application/octet-stream'

        try:
            # Read and serve the file
            with open(file_path, 'rb') as file:
                content = file.read()

            self.send_response(200)
            self.send_header('Content-Type', mime_type)
            self.send_header('Content-Length', str(len(content)))
            self.send_header('Cache-Control', 'no-cache')
            self.end_headers()
            self.wfile.write(content)

        except Exception as e:
            print(f"Error serving {file_path}: {e}")
            self.send_error(500, "Internal server error")

    def do_POST(self):
        self.send_error(404, "API endpoint not found")

    def log_message(self, format, *args):
        # Simple logging
        message = format % args
        if not any(skip in message for skip in ['.css', '.js', 'favicon']):
            print(f"[{self.date_time_string()}] {message}")

def main():
    PORT = 5000

    # Check if required files exist
    required_files = ['index.html', 'styles.css', 'script.js']
    for file in required_files:
        if not Path(file).exists():
            print(f"Error: {file} no encontrado")
            sys.exit(1)

    print("🧠 Fundacredesa - Salud Mental Venezuela")
    print("=" * 50)
    print(f"Servidor iniciando en puerto {PORT}")
    print(f"URL: http://localhost:{PORT}")
    print("Presiona Ctrl+C para detener")
    print("=" * 50)

    try:
        with socketserver.TCPServer(("0.0.0.0", PORT), FundacredesaHandler) as httpd:
            httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServidor detenido")
    except OSError as e:
        if e.errno == 98:
            print(f"Error: Puerto {PORT} ya está en uso")
            print("Detén otros servidores o usa un puerto diferente")
        else:
            print(f"Error al iniciar servidor: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()