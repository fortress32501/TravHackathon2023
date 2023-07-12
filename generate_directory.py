import csv
import random
from datetime import datetime, timedelta
import json
from faker import Faker

faker = Faker()

# Generate data for 1000 characters
NUM_ROWS = 1000

# Create the CSV file
OUTPUT_FILE = "directory_data.csv"

# Generate data rows
data_rows = []
manager_list = []
data_dicts = []
for i in range(1, NUM_ROWS + 1):
    # Generate random values for each column
    employee_id = i+100
    if i < 5:
        job_role = "manager"
    else:
        job_role = random.choice(
        ["data_engineer", "software_engineer", "human_resources", "sales", "cybersecurity", "accounting", "manager"]
    )
    if job_role == "manager":
        manager_list.append(employee_id)
    
    first_name = faker.first_name()
    last_name = faker.last_name()
    phone = faker.phone_number()
    if job_role == "manager":
        manager = "NA"
    else:
        manager = random.choice(manager_list)
    
    location = random.choice(["New York, NY", "Miami, FL", "Los Angeles, CA", "Seattle, WA", "Houston, TX", "Des Moines, IA", "Minneapolis, MN", "Nashville, TN"])
    
    salary = random.randint(50000, 120000)

    high_job_salary = 20000
    mid_job_salary = 10000
    if job_role in ["manager" ,"data_engineer","software_engineer"]:
        salary += high_job_salary

    elif job_role in ["cybersecurity", "accounting"]:
        salary += mid_job_salary  

    location_salary = 10000    
    if location in ["New York, NY", "Miami, FL", "Los Angeles, CA", "Seattle, WA", "Houston, TX"]:
        salary += location_salary

    # Create the data row
    data_row = [
        employee_id,
        first_name,
        last_name,
        phone,
        location,
        job_role,
        manager,
        salary,
    ]

    # Add the data row to the list
    data_rows.append(data_row)

    data_dict = {
        'employee_id': employee_id,
        'first_name': first_name,
        'last_name': last_name,
        'phone': phone,
        'location': location,
        'job_role': job_role,
        'manager': manager,
        'salary': salary,
    }

    data_dicts.append(data_dict)

####### CSV file output
with open(OUTPUT_FILE, "w", newline="") as file:
    writer = csv.writer(file)
    writer.writerow(
        ["employee_id", "first_name", "last_name", "phone", "location", "job_role", "manager",
         "salary"]
    )
    writer.writerows(data_rows)

####### JSON file output

with open("data_directory.json", 'w') as file:
        file.write(json.dumps(data_dicts, indent=2))

print("Data generation complete.")


# orders = []

# def make_customers(number_of_customers_to_create: int) -> None:
#     '''
#     Create a bunch of fake customers
#     '''
#     for i in range(number_of_customers_to_create):
#         customer = {
#             'id': i+100,
#             'first_name': faker.first_name(),
#             'last_name': faker.last_name(),
#             'address': faker.address(),
#             'phone': faker.phone_number(),
#             'email': faker.email(),
#             'credit_card': {
#                 'pan': faker.credit_card_number(),
#                 'cvv': faker.credit_card_security_code(),
#                 'expire': faker.credit_card_expire(start="now", end="+7y"),
#             }
#         }
#         customers.append(customer)

#     with open(customers_file_name, 'w') as file:
#         file.write(json.dumps(customers, indent=2))


# def make_products(number_of_products_to_create: int = 10) -> None:
#     '''
#     Create a bunch of fake products
#     '''
#     for i in range(number_of_products_to_create):
#         product = {
#             'id': i+100,
#             'name': ' '.join(faker.words(2)).capitalize(),   # Two words
#             'description': faker.paragraph(nb_sentences=5),  # ~ 5 sentences
#             'price': round(random.uniform(5.00, 38.99), 2),
#             'quantity_on_hand': faker.random_int(0, 30),
#         }
#         products.append(product)

#     with open(products_file_name, 'w') as file:
#         file.write(json.dumps(products, indent=2))


# def make_orders(number_of_orders_to_create: int) -> None:
#     '''
#     Create a bunch of fake orders
#     '''
#     def get_order_lines():
#         order_lines = []
#         for i in range(random.randint(1, 6)):
#             line = {"product": random.choice(products),  # Gets a random element
#                     "quantity": random.randint(1, 5)}
#             order_lines.append(line)
#         return order_lines
#     for i in range(number_of_orders_to_create):
#         order = {
#             'id': i+100,
#             'customer': random.choice(customers),
#             'lines': get_order_lines(),
#             # isoformat() to convert to a string b/c dates aren't JSON serializable.
#             'order_date': faker.date_between(start_date='-10d', end_date='today').isoformat()
#         }
#         orders.append(order)

#     with open(orders_file_name, 'w') as file:
#         file.write(json.dumps(orders, indent=2))


# # Make all the data
# make_customers(100)
# make_products(30)
# make_orders(250)

# print("Data was created")
