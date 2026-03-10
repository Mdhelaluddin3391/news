from django.contrib import admin
from .models import User

@admin.register(User)
class CustomUserAdmin(admin.ModelAdmin):
    # 'role' ko list_display me add kiya gaya hai taaki bahar se hi sabka role dikh jaye
    list_display = ('email', 'name', 'role', 'is_staff', 'is_active', 'created_at')
    
    # Filter by role add kiya hai (Admin panel right side me filter aayega)
    list_filter = ('role', 'is_staff', 'is_active', 'is_superuser')
    
    search_fields = ('email', 'name')
    ordering = ('email',)
    
    # Admin panel me jab kisi user ko edit/create karenge, tab 'role' select karne ka option aayega
    fieldsets = (
        ('Login Info', {'fields': ('email', 'password')}),
        ('Personal Info', {'fields': ('name', 'bio', 'profile_picture')}),
        ('Role & Permissions', {'fields': (
            'role', # Yahan role change karne ka dropdown aayega
            'is_active', 
            'is_staff', 
            'is_superuser', 
            'groups', 
            'user_permissions'
        )}),
    )
    
    def save_model(self, request, obj, form, change):
        if obj.pk:
            # Check if password was changed in admin panel
            orig_obj = User.objects.get(pk=obj.pk)
            if obj.password != orig_obj.password:
                obj.set_password(obj.password)
        else:
            obj.set_password(obj.password)
        
        # --- NAYA CODE: Authors aur Reporters ko bhi staff access dein ---
        if obj.role in ['admin', 'editor', 'author', 'reporter']:
            obj.is_staff = True
        else:
            obj.is_staff = False
            
        super().save_model(request, obj, form, change)