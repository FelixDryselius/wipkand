from django.db import models
from django.contrib.auth.models import (
    BaseUserManager, AbstractBaseUser
)
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.validators import UnicodeUsernameValidator
from django.utils import timezone


class CepheidUserManager(BaseUserManager):
    #use_in_migrations = True

    def _create_user(self, username, email, password, **extra_fields):
        """
        Create and save a user with the given username, email, and password.
        """
        if not username:
            raise ValueError('The given username must be set')
        email = self.normalize_email(email)
        username = self.model.normalize_username(username)
        user = self.model(username=username, email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, username, email=None, password=None, **extra_fields):
        extra_fields.setdefault('admin', False)
        extra_fields.setdefault('staff', True)
        #extra_fields.setdefault('is_superuser', False)
        return self._create_user(username, email, password, **extra_fields)

    def create_superuser(self, username, email, password, **extra_fields):
        extra_fields.setdefault('staff', True)
        extra_fields.setdefault('admin', True)
        #extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('admin') is not True:
            raise ValueError('Superuser must have admin=True.')
        # if extra_fields.get('is_superuser') is not True:
        #     raise ValueError('Superuser must have is_superuser=True.')    

        return self._create_user(username, email, password, **extra_fields)


class CepheidUser(AbstractBaseUser):
    username_validator = UnicodeUsernameValidator()
    username = models.CharField(
        _('username'),
        max_length=150,
        unique=True,
        help_text=_(
            'Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.'),
        validators=[username_validator],
        error_messages={
            'unique': _("A user with that username already exists."),
        },
    )
    first_name = models.CharField(_('first name'), max_length=30, blank=True)
    last_name = models.CharField(_('last name'), max_length=150, blank=True)
    email = models.EmailField(_('email address'), blank=True)


    staff = models.BooleanField(
        default=False,
        help_text=_('Designates whether the user can log into this admin site.'),
    )

    admin = models.BooleanField(
        default=False,
        help_text=_('Designates whether the user can log into this admin site and make changes.'),
    )

    operator = models.BooleanField(
        default=False,
        help_text=_(
            'Designates whether the user can access the operations page to input data.'),
    )

    supervisor = models.BooleanField(
        default=False,
        help_text=_(
            'Designates whether the user can access statistics for production .'),
    )

    active = models.BooleanField(
        _('active'),
        default=True,
        help_text=_(
            'Designates whether this user should be treated as active. '
            'Unselect this instead of deleting accounts.'
        ),
    )

    objects = CepheidUserManager()

    EMAIL_FIELD = 'email'
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']

    class Meta:
        verbose_name = _('account')
        verbose_name_plural = _('accounts')


    def __str__(self):
        return self.username

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return True

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True

    @property
    def is_staff(self):
        "Does the user have admin status?"
        return self.staff

    @property
    def is_admin(self):
        "Does the user have admin status?"
        return self.admin

    @property
    def is_operator(self):
        "Does the user have operator status?"
        return self.operator
    
    @property
    def is_supervisor(self):
        "Does the user have supervisor status?"
        return self.supervisor
