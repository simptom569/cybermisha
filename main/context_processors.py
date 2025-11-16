import time

def cache_bust(request):
    """Add cache busting version to templates"""
    return {
        'CSS_VERSION': int(time.time())  # Unix timestamp
    }
