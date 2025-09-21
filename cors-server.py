#!/usr/bin/env python3
"""
CORS-enabled HTTP server voor Penpot plugin development
"""
from http.server import HTTPServer, SimpleHTTPRequestHandler
import os

class CORSHTTPRequestHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_cors_headers()
        super().end_headers()
    
    def send_cors_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
    
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_cors_headers()
        self.end_headers()

if __name__ == '__main__':
    PORT = 8080
    os.chdir('/Users/kennytimmer/Documents/GitHub/iKons/penpot-material-symbols-plugin')
    
    server = HTTPServer(('localhost', PORT), CORSHTTPRequestHandler)
    print(f'🚀 CORS Server running at http://localhost:{PORT}')
    print(f'📋 Plugin URL: http://localhost:{PORT}/manifest.json')
    print('✅ CORS headers enabled')
    print('Press Ctrl+C to stop')
    
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print('\n🛑 Server stopped')
        server.shutdown()
