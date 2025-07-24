import os
import google.generativeai as genai
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Configure API key
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=GEMINI_API_KEY)

# List available models
models = genai.list_models()

# Print each model's name and supported methods
for model in models:
    print("Model Name:", model.name)
    print("  - Description:", model.description)
    print("  - Input Token Limit:", model.input_token_limit)
    print("  - Output Token Limit:", model.output_token_limit)
    print("  - Supported Generation Methods:", model.supported_generation_methods)
    print()
