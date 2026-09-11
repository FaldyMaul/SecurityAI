import json
import copy

with open('result_telkomai_full_run_1.json', encoding='utf-8') as f:
    run1 = json.load(f)

with open('result_telkomai_full_run_2.json', encoding='utf-8') as f:
    run2 = json.load(f)

cookbooks_1 = run1['results']['cookbooks']
cookbooks_2 = run2['results']['cookbooks']

for cb in cookbooks_2:
    new_cb = copy.deepcopy(cb)
    # filter recipes
    new_recipes = [r for r in new_cb['recipes'] if r['id'] not in ('singapore-facts-tf', 'singapore-facts-mcq')]
    new_cb['recipes'] = new_recipes
    
    # check if cb['id'] already exists in cookbooks_1
    existing_cb = next((c for c in cookbooks_1 if c['id'] == cb['id']), None)
    if existing_cb:
        existing_cb['recipes'].extend(new_cb['recipes'])
    else:
        cookbooks_1.append(new_cb)

for cb in run2['metadata']['cookbooks']:
    if cb not in run1['metadata']['cookbooks']:
        run1['metadata']['cookbooks'].append(cb)

run1['metadata']['duration'] += run2['metadata']['duration']
run1['metadata']['end_time'] = run2['metadata']['end_time']

with open('combined_result.json', 'w', encoding='utf-8') as f:
    json.dump(run1, f, indent=2)

print("Combined JSON written to combined_result.json")
