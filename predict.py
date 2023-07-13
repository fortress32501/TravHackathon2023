import sys
import json
import pickle
import pandas as pd

# Load the pre-trained model
with open('hackathon_model_2.pkl', 'rb') as f:
    model = pickle.load(f)

list_of_cols = [
    'location_Des Moines, IA',
    'location_Houston, TX',
    'location_Los Angeles, CA',
    'location_Miami, FL',
    'location_Minneapolis, MN',
    'location_Nashville, TN',
    'location_New York, NY',
    'location_Seattle, WA',
    'job_role_accounting',
    'job_role_cybersecurity',
    'job_role_data_engineer',
    'job_role_human_resources', 
    'job_role_manager',
    'job_role_sales',
    'job_role_software_engineer', 
    ]
# Read data from stdin
data = sys.stdin.read()
data_val = json.loads(data)
data_val[2]= int(data_val[2])

# Perform the prediction
df = pd.DataFrame([data_val], columns=['location', 'job_role', 'years_of_experience'])
df2 = pd.get_dummies(df, columns=['location', 'job_role'])
df3 = pd.DataFrame()
df3['years_of_experience'] = [data_val[2]]
for i in list_of_cols:
    if i not in df2.columns:
        df3[i] = [0]
    else:
        df3[i] = [1]
predictions = model.predict(df3)
print(predictions)
