from django.urls import path
import main.views as views

urlpatterns = [
    path('', views.main_page, name='main'),
    path('ai', views.ai_solutions_page, name='ai-solutions'),
    path('contact', views.contact_page, name='contact'),
    path('cases', views.cases_page, name='cases'),
    path('tutorials', views.tutorials_page, name='tutorials'),
    path('consalting', views.consalting_page, name='consalting'),
    path('ai-transform', views.ai_transform_page, name='ai-transform'),
    path('about', views.about_page, name='about'),
    path('maps-llm', views.maps_llm_page, name='maps-llm'),
    path('neuro-administration', views.neuro_administration_page, name='neuro-administration'),
    path('commerce', views.commerce_page, name='commerce')
]
