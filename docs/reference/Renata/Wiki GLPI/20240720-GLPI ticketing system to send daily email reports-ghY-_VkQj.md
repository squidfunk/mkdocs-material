# GLPI ticketing system to send daily email reports

## Fetch data from the GLPI API and then attach a report to the email.

### Step 1: Install Required Libraries

In addition to the previously mentioned libraries, you'll need the `requests` library to interact with the GLPI API. Install it using pip:

```bash
pip install requests
```

### Step 2: Fetch Data from GLPI API

You'll need to interact with the GLPI API to fetch ticket data. Here's a function to do that:

```python
import requests
import json
import pandas as pd
from datetime import datetime

# GLPI API credentials and configuration
GLPI_API_URL = 'https://your_glpi_url/apirest.php/'
GLPI_APP_TOKEN = 'your_app_token'
GLPI_USER_TOKEN = 'your_user_token'

def fetch_glpi_tickets():
    headers = {
        'App-Token': GLPI_APP_TOKEN,
        'Authorization': f'user_token {GLPI_USER_TOKEN}',
        'Content-Type': 'application/json'
    }
    
    response = requests.get(f"{GLPI_API_URL}Ticket", headers=headers)
    if response.status_code != 200:
        raise Exception("Error fetching GLPI tickets")
    
    tickets = response.json()
    return tickets

def create_report(tickets):
    # Convert tickets to DataFrame
    df = pd.DataFrame(tickets)
    report_filename = f'daily_report_{datetime.now().strftime("%Y-%m-%d")}.csv'
    df.to_csv(report_filename, index=False)
    return report_filename
```

### Step 3: Modify the Email Script

Integrate the GLPI data fetching and report creation into the email script:

```python
import smtplib
import ssl
import schedule
import time
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email import encoders
from datetime import datetime

# Email credentials and configuration
SMTP_SERVER = 'smtp.gmail.com'
SMTP_PORT = 465
SENDER_EMAIL = 'your_email@gmail.com'
SENDER_PASSWORD = 'your_password'
RECEIVER_EMAIL = 'receiver_email@example.com'

# GLPI API credentials and configuration
GLPI_API_URL = 'https://your_glpi_url/apirest.php/'
GLPI_APP_TOKEN = 'your_app_token'
GLPI_USER_TOKEN = 'your_user_token'

def fetch_glpi_tickets():
    headers = {
        'App-Token': GLPI_APP_TOKEN,
        'Authorization': f'user_token {GLPI_USER_TOKEN}',
        'Content-Type': 'application/json'
    }
    
    response = requests.get(f"{GLPI_API_URL}Ticket", headers=headers)
    if response.status_code != 200:
        raise Exception("Error fetching GLPI tickets")
    
    tickets = response.json()
    return tickets

def create_report(tickets):
    # Convert tickets to DataFrame
    df = pd.DataFrame(tickets)
    report_filename = f'daily_report_{datetime.now().strftime("%Y-%m-%d")}.csv'
    df.to_csv(report_filename, index=False)
    return report_filename

# Function to create the email
def create_email(report_filename):
    subject = f"Daily GLPI Report - {datetime.now().strftime('%Y-%m-%d')}"
    body = "Please find attached the daily GLPI ticket report."

    # Create a multipart message and set headers
    message = MIMEMultipart()
    message['From'] = SENDER_EMAIL
    message['To'] = RECEIVER_EMAIL
    message['Subject'] = subject

    # Attach the body with the msg instance
    message.attach(MIMEText(body, 'plain'))

    # Open the file to be sent
    attachment = open(report_filename, 'rb')

    # Instance of MIMEBase and named as part
    part = MIMEBase('application', 'octet-stream')
    part.set_payload((attachment).read())

    # Encode file in ASCII characters to send by email
    encoders.encode_base64(part)

    # Add header as key/value pair to attachment part
    part.add_header('Content-Disposition', f"attachment; filename= {report_filename}")

    # Attach the instance 'part' to message instance
    message.attach(part)

    return message.as_string()

# Function to send the email
def send_email():
    tickets = fetch_glpi_tickets()
    report_filename = create_report(tickets)
    message = create_email(report_filename)
    context = ssl.create_default_context()

    with smtplib.SMTP_SSL(SMTP_SERVER, SMTP_PORT, context=context) as server:
        server.login(SENDER_EMAIL, SENDER_PASSWORD)
        server.sendmail(SENDER_EMAIL, RECEIVER_EMAIL, message)

    print("Email sent!")

# Schedule the email to be sent daily at a specific time
schedule.every().day.at("08:00").do(send_email)  # Set the time you want the email to be sent

# Keep the script running
while True:
    schedule.run_pending()
    time.sleep(1)
```

### Step 4: Setting Up the Script

1. **Email and GLPI Configuration**: Replace placeholders such as `SENDER_EMAIL`, `SENDER_PASSWORD`, `RECEIVER_EMAIL`, `GLPI_API_URL`, `GLPI_APP_TOKEN`, and `GLPI_USER_TOKEN` with your actual values.

2. **Running the Script**: Save the script and run it as before:

```bash
python daily_email_report.py
```

### Considerations

- **Security**: Store sensitive information securely, e.g., using environment variables.
- **Error Handling**: Add error handling for various possible issues such as API errors, email sending errors, etc.
- **Custom Report Formatting**: Modify the `create_report` function to format the report as needed.