import json

with open('result_telkomai_full_run_2.json', encoding='utf-8') as f:
    run2 = json.load(f)

datasets = set()
for cookbook in run2['results']['cookbooks']:
    for recipe in cookbook['recipes']:
        for detail in recipe['details']:
            datasets.add(detail['dataset_id'])

with open('datasets_run2.txt', 'w', encoding='utf-8') as f:
    for d in sorted(list(datasets)):
        f.write(d + '\n')
