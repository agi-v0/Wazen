import requests
from bs4 import BeautifulSoup
from lxml import html
import json
import time

# Create a session
session = requests.Session()

# Add headers to mimic a browser
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
}

# Function to fetch HTML content with retries
def fetch_html(url, retries=3):
    try:
        response = session.get(url, headers=headers)
        response.raise_for_status()
        return response.text
    except requests.exceptions.RequestException as e:
        print(f"Error fetching {url}: {e}")
        if retries > 0:
            print(f"Retrying... ({retries} attempts left)")
            time.sleep(2)  # Wait for 2 seconds before retrying
            return fetch_html(url, retries - 1)
        else:
            print(f"Failed to retrieve {url} after multiple attempts")
            return None

# Function to parse the HTML content
def parse_content(html_content, content_xpath):
    soup = BeautifulSoup(html_content, 'html.parser')
    dom = html.fromstring(str(soup))
    content_elements = dom.xpath(content_xpath)
    if content_elements:
        content_soup = BeautifulSoup(html.tostring(content_elements[0], encoding='unicode', method='html'), 'html.parser')
        filtered_content = []
        
        for tag in content_soup.find_all(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'ul', 'li', 'a']):
            if tag.name == 'a':
                clean_tag = BeautifulSoup(f'<a href="{tag.get("href", "")}">{tag.text}</a>', 'html.parser').a
            else:
                clean_tag = BeautifulSoup(f'<{tag.name}>{tag.decode_contents()}</{tag.name}>', 'html.parser').find()
            filtered_content.append(str(clean_tag))
        
        content = ''.join(filtered_content)
    else:
        content = 'No Content'
    
    return content

# Function to convert HTML content to PortableText format
# def convert_to_portabletext(html_content):
    # soup = BeautifulSoup(html_content, 'html.parser')
    # blocks = []
# 
    # for tag in soup.find_all(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'ul', 'li']):
        # block = {
            # "_type": "block",
            # "style": "normal" if tag.name == 'p' else tag.name,
            # "children": []
        # }
# 
        # if tag.name == 'ul':
            # for li in tag.find_all('li'):
                # block['children'].append({
                    # "_type": "block",
                    # "style": "normal",
                    # "children": [{"_type": "span", "text": li.get_text(), "marks": []}]
                # })
        # else:
            # block['children'].append({"_type": "span", "text": tag.get_text(), "marks": []})
# 
        # blocks.append(block)
# 
    # return blocks

# Function to process each link in the JSON data
def process_links(json_data, content_xpath):
    for obj in json_data:
        if 'link' in obj:
            url = obj['link']
            print(f"Scraping {url}")
            html_content = fetch_html(url)
            if html_content:
                content_html = parse_content(html_content, content_xpath)
                #content_portabletext = convert_to_portabletext(content_html)
                obj['body'] = content_html
                print(f"Successfully scraped {url}")
            else:
                obj['content'] = 'Failed to retrieve content'
                print(f"Failed to scrape {url}")
    return json_data

# Load JSON data from a file
with open('graphql.json', 'r', encoding='utf-8') as f:
    json_data = json.load(f)

# Define the XPath for content
content_xpath = '/html/body/div[1]/div[3]/div/main/article/div/div/section/div[2]/div/div/div[2]/div/div'  # Adjust this XPath as needed

# Process links and update JSON data
updated_json_data = process_links(json_data, content_xpath)

# Save updated JSON data to a file
with open('scraped.json', 'w', encoding='utf-8') as f:
    json.dump(updated_json_data, f, ensure_ascii=False, indent=4)

#step1: scraper.py 
#step2: node cleaner.mjs orr script.mjs