from rest_framework import pagination

class VFALPagination(pagination.LimitOffsetPagination):
    default_limit = 20
    max_limit = 72