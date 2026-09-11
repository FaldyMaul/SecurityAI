import json
import os
import random

# Directories
DATA_DIR = r"d:\Work\PAM\SecurityAI\moonshot-install\moonshot-data"
COOKBOOKS_DIR = os.path.join(DATA_DIR, "cookbooks")
RECIPES_DIR = os.path.join(DATA_DIR, "recipes")
DATASETS_DIR = os.path.join(DATA_DIR, "datasets")

# The cookbooks and their desired sample rates
CONFIG = {
    "data-disclosure": 1.0,
    "adversarial-attacks": 1.0,
    "hallucination": 0.10,
    "undesirable-content": 0.01
}

new_recipes_list = []

for cb_name, rate in CONFIG.items():
    cb_path = os.path.join(COOKBOOKS_DIR, f"{cb_name}.json")
    if not os.path.exists(cb_path):
        print(f"Warning: Cookbook {cb_name} not found.")
        continue
    
    with open(cb_path, 'r', encoding='utf-8') as f:
        cb_data = json.load(f)
    
    for recipe_name in cb_data.get('recipes', []):
        recipe_path = os.path.join(RECIPES_DIR, f"{recipe_name}.json")
        if not os.path.exists(recipe_path):
            continue
            
        with open(recipe_path, 'r', encoding='utf-8') as f:
            recipe_data = json.load(f)
            
        new_datasets_for_recipe = []
        
        for ds_name in recipe_data.get('datasets', []):
            ds_path = os.path.join(DATASETS_DIR, f"{ds_name}.json")
            if not os.path.exists(ds_path):
                # Maybe it is a csv? For simplicity assuming json
                continue
                
            with open(ds_path, 'r', encoding='utf-8') as f:
                ds_data = json.load(f)
                
            if 'examples' in ds_data:
                examples = ds_data['examples']
                num_to_sample = max(1, int(len(examples) * rate))
                if rate >= 1.0:
                    sampled_examples = examples
                else:
                    sampled_examples = random.sample(examples, min(num_to_sample, len(examples)))
                
                ds_data['examples'] = sampled_examples
                ds_data['name'] = f"{ds_data.get('name', ds_name)} (Sampled {int(rate*100)}%)"
                
                new_ds_name = f"sampled_{cb_name}_{ds_name}"
                new_ds_path = os.path.join(DATASETS_DIR, f"{new_ds_name}.json")
                with open(new_ds_path, 'w', encoding='utf-8') as out_f:
                    json.dump(ds_data, out_f, indent=4)
                    
                new_datasets_for_recipe.append(new_ds_name)
        
        if new_datasets_for_recipe:
            recipe_data['datasets'] = new_datasets_for_recipe
            new_recipe_name = f"sampled_{cb_name}_{recipe_name}"
            recipe_data['name'] = f"{recipe_data.get('name', recipe_name)} (Sampled)"
            
            new_recipe_path = os.path.join(RECIPES_DIR, f"{new_recipe_name}.json")
            with open(new_recipe_path, 'w', encoding='utf-8') as out_f:
                json.dump(recipe_data, out_f, indent=4)
                
            new_recipes_list.append(new_recipe_name)

# Create the final Master Cookbook
master_cookbook = {
    "name": "Custom Risk Report (Optimized)",
    "description": "A single custom cookbook merging Data Disclosure(100%), Adversarial Attacks(100%), Hallucination(10%), and Undesirable Content(1%) to generate a single Risk Report.",
    "tags": ["Custom", "Risk Report"],
    "categories": ["User Custom"],
    "recipes": new_recipes_list
}

master_cb_path = os.path.join(COOKBOOKS_DIR, "custom-risk-report.json")
with open(master_cb_path, 'w', encoding='utf-8') as f:
    json.dump(master_cookbook, f, indent=4)

print(f"Successfully generated custom cookbook: custom-risk-report.json with {len(new_recipes_list)} recipes.")
