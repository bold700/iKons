#!/usr/bin/env python3
"""
Penpot-compatible localhost server
"""
from http.server import HTTPServer, SimpleHTTPRequestHandler
import os
import json

class PenpotCORSHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        # Penpot-specific CORS headers
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Cache-Control')
        self.send_header('Access-Control-Allow-Credentials', 'true')
        self.send_header('Cross-Origin-Embedder-Policy', 'unsafe-none')
        self.send_header('Cross-Origin-Opener-Policy', 'unsafe-none')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200, "OK")
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Cache-Control')
        self.end_headers()

    def do_GET(self):
        # Special handling for plugin files
        if self.path == '/manifest.json':
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Cache-Control', 'no-cache')
            self.end_headers()
            
            try:
                with open('manifest.json', 'r') as f:
                    content = f.read()
                self.wfile.write(content.encode('utf-8'))
            except FileNotFoundError:
                self.send_error(404, "manifest.json not found")
            return
            
        # Default handling
        super().do_GET()

    def log_message(self, format, *args):
        # Custom logging
        print(f"[PENPOT SERVER] {format % args}")

if __name__ == '__main__':
    PORT = 3001
    
    server = HTTPServer(('0.0.0.0', PORT), PenpotCORSHandler)
    print(f'🚀 Penpot-compatible server running at:')
    print(f'   http://localhost:{PORT}')
    print(f'   http://127.0.0.1:{PORT}')
    print(f'')
    print(f'📋 Plugin URL for Penpot:')
    print(f'   http://localhost:{PORT}/manifest.json')
    print(f'')
    print(f'✅ Enhanced CORS headers enabled')
    print(f'🔧 Penpot-specific configuration active')
    print(f'')
    print('Press Ctrl+C to stop server')
    
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print('\n🛑 Server stopped')
        server.shutdown()
