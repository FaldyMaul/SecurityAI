import json

with open("combined_result.json", encoding="utf-8") as f:
    data = json.load(f)

html = """
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>AI Verify Assessment Report</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; color: #333; background-color: #f9f9f9; }
        h1 { color: #004080; text-align: center; }
        h2 { color: #0059b3; border-bottom: 2px solid #0059b3; padding-bottom: 5px; margin-top: 30px; }
        h3 { color: #0066cc; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; table-layout: fixed; }
        th, td { border: 1px solid #ddd; padding: 12px; text-align: left; vertical-align: top; word-wrap: break-word; }
        th { background-color: #004080; color: white; }
        tr:nth-child(even) { background-color: #f2f2f2; }
        tr:hover { background-color: #e6f2ff; }
        .summary { background-color: white; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1); margin-bottom: 30px; }
        .summary p { margin: 5px 0; }
        .container { background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
        .prompt, .response { white-space: pre-wrap; font-size: 13px; line-height: 1.4; }
    </style>
</head>
<body>
    <h1>AI Verify Assessment Report</h1>
"""

meta = data.get("metadata", {})
endpoints = meta.get('endpoints', [])
if endpoints is None: endpoints = []
cookbooks = meta.get('cookbooks', [])
if cookbooks is None: cookbooks = []

html += f"""
    <div class="summary">
        <h2>Assessment Summary</h2>
        <p><strong>ID:</strong> {meta.get('id', 'N/A')}</p>
        <p><strong>Start Time:</strong> {meta.get('start_time', 'N/A')}</p>
        <p><strong>End Time:</strong> {meta.get('end_time', 'N/A')}</p>
        <p><strong>Duration:</strong> {meta.get('duration', 0)} seconds</p>
        <p><strong>Endpoints:</strong> {', '.join(endpoints)}</p>
        <p><strong>Cookbooks:</strong> {', '.join(cookbooks)}</p>
    </div>
    <div class="container">
"""

cookbooks_data = data.get("results", {}).get("cookbooks", [])
for cb in cookbooks_data:
    html += f"<h2>Cookbook: {cb.get('id', 'Unknown')}</h2>"
    for r in cb.get("recipes", []):
        html += f"<h3>Recipe: {r.get('id', 'Unknown')}</h3>"
        for d in r.get("details", []):
            dataset_id = d.get('dataset_id', 'Unknown')
            model_id = d.get('model_id', 'Unknown')
            html += f"<h4>Dataset: {dataset_id} (Model: {model_id})</h4>"
            html += """
            <table>
                <tr>
                    <th style="width: 30%;">Prompt</th>
                    <th style="width: 45%;">Predicted Result</th>
                    <th style="width: 15%;">Target</th>
                    <th style="width: 10%;">Duration (s)</th>
                </tr>
            """
            for item in d.get("data", []):
                prompt = str(item.get("prompt", "")).replace("<", "&lt;").replace(">", "&gt;")
                predicted = item.get("predicted_result", {}).get("response", "")
                if predicted is None: predicted = ""
                predicted = str(predicted).replace("<", "&lt;").replace(">", "&gt;")
                target = str(item.get("target", "")).replace("<", "&lt;").replace(">", "&gt;")
                duration = round(float(item.get("duration", 0)), 2)
                
                html += f"""
                <tr>
                    <td class="prompt">{prompt}</td>
                    <td class="response">{predicted}</td>
                    <td class="prompt">{target}</td>
                    <td>{duration}</td>
                </tr>
                """
            html += "</table><br>"

html += """
    </div>
</body>
</html>
"""

with open("combined_report.html", "w", encoding="utf-8") as f:
    f.write(html)
print("Generated combined_report.html")
