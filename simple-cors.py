#!/usr/bin/env python3
"""
Simpele CORS server voor Penpot plugins
"""
from http.server import HTTPServer, SimpleHTTPRequestHandler
import os

class SimpleCORSHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

if __name__ == '__main__':
    PORT = 3001
    os.chdir('/Users/kennytimmer/Documents/GitHub/iKons/penpot-material-symbols-plugin')
    
    server = HTTPServer(('127.0.0.1', PORT), SimpleCORSHandler)
    print(f'🚀 CORS Server: http://127.0.0.1:{PORT}')
    print(f'📋 Plugin URL: http://127.0.0.1:{PORT}/manifest.json')
    print('✅ OPTIONS support enabled')
    
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print('\n🛑 Server stopped')
        server.shutdown()
