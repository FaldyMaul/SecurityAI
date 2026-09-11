import json
import urllib.request
import urllib.error
import time

url_get = "http://127.0.0.1:5000/api/v1/sessions/qa-test-session"
url_post = "http://127.0.0.1:5000/api/v1/sessions/qa-test-session/prompt"
data = json.dumps({"history_length": 10, "user_prompt": "Hello"}).encode("utf-8")
headers = {"Content-Type": "application/json"}

print(f"Populating active_runner with GET request to {url_get}...")
try:
    req_get = urllib.request.Request(url_get, method="GET")
    with urllib.request.urlopen(req_get) as response:
        print(f"GET Response Status: {response.getcode()}")
except Exception as e:
    print(f"GET Error: {str(e)}")

print(f"Sending prompt to {url_post}...")
try:
    req = urllib.request.Request(url_post, data=data, headers=headers, method="POST")
    with urllib.request.urlopen(req) as response:
        print(f"Response Status: {response.getcode()}")
        print(response.read().decode('utf-8'))
except urllib.error.HTTPError as e:
    print(f"HTTP Error {e.code}: {e.read().decode('utf-8')}")
except Exception as e:
    print(f"Other Error: {str(e)}")
