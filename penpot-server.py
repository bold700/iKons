#!/usr/bin/env python3
"""
Penpot-compatible localhost server
"""
from http.server import HTTPServer, SimpleHTTPRequestHandler
import os
import json

class PenpotCORSHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        # Enhanced CORS headers for Penpot compatibility
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, HEAD')
        self.send_header('Access-Control-Allow-Headers', '*')
        self.send_header('Access-Control-Expose-Headers', '*')
        self.send_header('Access-Control-Max-Age', '86400')
        self.send_header('Cross-Origin-Embedder-Policy', 'unsafe-none')
        self.send_header('Cross-Origin-Opener-Policy', 'unsafe-none')
        self.send_header('Cross-Origin-Resource-Policy', 'cross-origin')
        # Additional headers for plugin compatibility
        self.send_header('X-Content-Type-Options', 'nosniff')
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200, "OK")
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, HEAD')
        self.send_header('Access-Control-Allow-Headers', '*')
        self.send_header('Access-Control-Expose-Headers', '*')
        self.end_headers()

    def do_GET(self):
        # Special handling for plugin files
        if self.path == '/manifest.json':
            self.send_response(200)
            self.send_header('Content-Type', 'application/json; charset=utf-8')
            self.end_headers()
            
            try:
                with open('manifest.json', 'r', encoding='utf-8') as f:
                    content = f.read()
                self.wfile.write(content.encode('utf-8'))
            except FileNotFoundError:
                self.send_error(404, "manifest.json not found")
            return
        
        elif self.path == '/plugin.js':
            self.send_response(200)
            self.send_header('Content-Type', 'application/javascript; charset=utf-8')
            self.end_headers()
            
            try:
                with open('plugin.js', 'r', encoding='utf-8') as f:
                    content = f.read()
                self.wfile.write(content.encode('utf-8'))
            except FileNotFoundError:
                self.send_error(404, "plugin.js not found")
            return
        
        elif self.path == '/' or self.path == '/index.html':
            self.send_response(200)
            self.send_header('Content-Type', 'text/html; charset=utf-8')
            self.end_headers()
            
            try:
                with open('index.html', 'r', encoding='utf-8') as f:
                    content = f.read()
                self.wfile.write(content.encode('utf-8'))
            except FileNotFoundError:
                self.send_error(404, "index.html not found")
            return
            
        # Default handling for other files
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
