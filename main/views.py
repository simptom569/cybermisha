from django.shortcuts import render


def main_page(request):
    return render(request, 'main/home.html')

def ai_solutions_page(request):
    return render(request, 'main/ai-solutions.html')

def contact_page(request):
    return render(request, 'main/contact.html')

def cases_page(request):
    return render(request, 'main/cases.html')

def tutorials_page(request):
    return render(request, 'main/tutorials.html')

def consalting_page(request):
    return render(request, 'main/consalting.html')

def ai_transform_page(request):
    return render(request, 'main/ai-transform.html')

def about_page(request):
    return render(request, 'main/about.html')

def maps_llm_page(request):
    return render(request, 'main/maps-llm.html')