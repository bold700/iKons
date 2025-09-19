#!/usr/bin/env python3
"""
Simple HTTP server with CORS headers for Penpot plugin development
"""
import http.server
import socketserver
from http.server import HTTPServer, BaseHTTPRequestHandler
import os
import json

class CORSRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        self.send_header('Access-Control-Allow-Credentials', 'false')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        self.end_headers()

    def do_GET(self):
        # Add CORS headers to all responses
        if self.path == '/manifest.json':
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            
            with open('manifest.json', 'r') as f:
                self.wfile.write(f.read().encode())
            return
        elif self.path == '/index.html':
            self.send_response(200)
            self.send_header('Content-Type', 'text/html')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            
            with open('index.html', 'r') as f:
                self.wfile.write(f.read().encode())
            return
        elif self.path == '/plugin.js':
            self.send_response(200)
            self.send_header('Content-Type', 'application/javascript')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            
            with open('plugin.js', 'r') as f:
                self.wfile.write(f.read().encode())
            return
        elif self.path == '/icon.svg':
            self.send_response(200)
            self.send_header('Content-Type', 'image/svg+xml')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            
            with open('icon.svg', 'r') as f:
                self.wfile.write(f.read().encode())
            return
        
        # Default handling for other files
        super().do_GET()

if __name__ == "__main__":
    PORT = 8080
    os.chdir('/Users/kennytimmer/Documents/GitHub/iKons/penpot-material-symbols-plugin')
    
    with socketserver.TCPServer(("", PORT), CORSRequestHandler) as httpd:
        print(f"🚀 Plugin server running at http://localhost:{PORT}")
        print(f"📋 Manifest URL: http://localhost:{PORT}/manifest.json")
        print(f"🔧 Plugin UI: http://localhost:{PORT}/index.html")
        print(f"🧪 Test page: http://localhost:{PORT}/test.html")
        print("\n✅ CORS headers enabled for Penpot compatibility")
        print("Press Ctrl+C to stop the server")
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n🛑 Server stopped")
