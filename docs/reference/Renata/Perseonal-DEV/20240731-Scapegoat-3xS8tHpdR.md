# Scapegoat

## Detailed Step-by-Step Guide

### Part 1: Set Up WSL and Ubuntu

#### 1.1 Install WSL and Ubuntu

1. **Enable WSL**:
   Open PowerShell as Administrator and run:
   ```powershell
   wsl --install
   ```

2. **Install Ubuntu**:
   From the Microsoft Store, install the latest version of Ubuntu.

3. **Update and Upgrade Ubuntu**:
   Open Ubuntu and run:
   ```bash
   sudo apt update && sudo apt upgrade -y
   ```

### Part 2: Set Up a Proxy Server with Squid

#### 2.1 Install Squid on Ubuntu

1. **Install Squid**:
   ```bash
   sudo apt update
   sudo apt install squid -y
   ```

2. **Configure Squid**:
   Edit the Squid configuration file:
   ```bash
   sudo nano /etc/squid/squid.conf
   ```

   Add the following configuration to allow specific IPs and configure basic settings:
   ```
   acl allowed_ips src your_ip_address/32
   http_access allow allowed_ips
   http_port 3128
   ```

   Replace `your_ip_address` with the IP address you want to allow access.

3. **Restart Squid**:
   ```bash
   sudo systemctl restart squid
   sudo systemctl enable squid
   ```

#### 2.2 Deploy the Proxy Server on a Cloud Provider

1. **Choose a Cloud Provider**:
   You can use any cloud provider (e.g., AWS, Google Cloud, DigitalOcean). For this guide, we'll use DigitalOcean.

2. **Create a Droplet on DigitalOcean**:
   - Log in to DigitalOcean.
   - Create a new Droplet with Ubuntu.
   - Note the Droplet's IP address.

3. **Access the Droplet**:
   ```bash
   ssh root@your_droplet_ip
   ```

4. **Install and Configure Squid on the Droplet**:
   Follow the steps in section 2.1 to install and configure Squid on your Droplet.

### Part 3: Configure the Web Scraper

#### 3.1 Install Required Libraries

1. **Install Python and Pip**:
   ```bash
   sudo apt install python3 python3-pip -y
   ```

2. **Install Selenium and Other Libraries**:
   ```bash
   pip3 install selenium requests beautifulsoup4 lxml scrapy-rotating-proxies
   ```

#### 3.2 Install Web Driver (ChromeDriver)

1. **Install Chrome**:
   ```bash
   sudo apt install wget unzip -y
   wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
   sudo dpkg -i google-chrome-stable_current_amd64.deb
   sudo apt --fix-broken install -y
   ```

2. **Install ChromeDriver**:
   ```bash
   CHROME_DRIVER_VERSION=$(curl -sS chromedriver.storage.googleapis.com/LATEST_RELEASE)
   wget https://chromedriver.storage.googleapis.com/$CHROME_DRIVER_VERSION/chromedriver_linux64.zip
   unzip chromedriver_linux64.zip
   sudo mv chromedriver /usr/local/bin/
   ```

#### 3.3 Web Scraper Script

Create a script `scraper.py`:

```python
import time
import random
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from bs4 import BeautifulSoup
import requests
import csv
import json

USER_AGENTS = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Safari/605.1.15',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36 Edge/16.16299',
]

PROXIES = [
    'http://your_proxy_ip:3128',
]

def get_random_user_agent():
    return random.choice(USER_AGENTS)

def get_random_proxy():
    return random.choice(PROXIES)

def create_webdriver():
    chrome_options = Options()
    chrome_options.add_argument("--headless")
    chrome_options.add_argument("--disable-gpu")
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_options.add_argument(f"user-agent={get_random_user_agent()}")

    proxy = get_random_proxy()
    chrome_options.add_argument(f'--proxy-server={proxy}')
    
    driver = webdriver.Chrome(options=chrome_options)
    return driver

def fetch_webpage(url):
    driver = create_webdriver()
    driver.get(url)
    time.sleep(random.uniform(2, 5))

    html = driver.page_source
    driver.quit()
    return html

def parse_html(html):
    soup = BeautifulSoup(html, 'lxml')
    # Your parsing logic here
    return soup

def save_to_csv(data, filename='data.csv'):
    keys = data[0].keys()
    with open(filename, 'w', newline='') as output_file:
        dict_writer = csv.DictWriter(output_file, fieldnames=keys)
        dict_writer.writeheader()
        dict_writer.writerows(data)

def save_to_json(data, filename='data.json'):
    with open(filename, 'w') as output_file:
        json.dump(data, output_file, indent=4)

def scrape_url(url):
    try:
        html = fetch_webpage(url)
        data = parse_html(html)
        # Process and store data
        save_to_csv(data)
        save_to_json(data)
        print(data)
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    url = 'https://example.com'
    scrape_url(url)
```

### Part 4: Deploy and Secure with Cloudflare

#### 4.1 Set Up Cloudflare

1. **Sign Up for Cloudflare**:
   - Sign up for Cloudflare and add your domain.
   - Update your domain's DNS settings to point to Cloudflare's nameservers.

2. **Configure Cloudflare**:
   - Set up DNS records to point to your proxy server IP.
   - Enable Cloudflare's security features such as DDoS protection, WAF (Web Application Firewall), and SSL/TLS.

3. **Secure Access**:
   - Use Cloudflare Access to secure your proxy and control who can access it.

### Running the Full Setup

1. **Ensure Squid is Running on Your Proxy Server**:
   ```bash
   sudo systemctl status squid
   ```

2. **Run the Web Scraper**:
   ```bash
   python3 scraper.py
   ```

### Additional Enhancements

1. **Concurrency and Rate Limiting**: Use Scrapy's `CONCURRENT_REQUESTS` and `DOWNLOAD_DELAY` settings to manage concurrency and avoid detection.
2. **CAPTCHA Handling**: Implement open-source CAPTCHA solving if possible or use manual solving for critical cases.
3. **Data Storage**: Use a database like SQLite for structured data storage.

### Conclusion

This detailed guide walks you through setting up a robust web scraping tool with your own proxy server, configuring it for optimal performance, and securing it with Cloudflare. This setup ensures you have a robust and secure infrastructure for your web scraping needs.

Feel free to ask if you need further clarification or assistance!