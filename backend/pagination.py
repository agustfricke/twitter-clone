from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response

class CustomPagination(PageNumberPagination):
    page_size = 2
    page_size_query_param = 'page_size'
    max_page_size = 10
    page_query_param = 'page'

    def get_paginated_response(self, data):
        return Response({
            'data': data,
            'meta': {
                'next': self.page.next_page_number() if self.page.has_next() else None,
                'previous': self.page.previous_page_number() if self.page.has_previous() else None,
                'count': self.page.paginator.count,
                }
        })
# from rest_framework.pagination import PageNumberPagination
# from rest_framework.response import Response

# DEFAULT_PAGE = 1
# DEFAULT_PAGE_SIZE = 2


# class CustomPagination(PageNumberPagination):
#     page = DEFAULT_PAGE
#     page_size = DEFAULT_PAGE_SIZE
#     page_size_query_param = 'page_size'

#     def get_paginated_response(self, data):
#         return Response({
#             'data': data,
#             'meta': {
#                 'all_data': self.page.paginator.count,
#                 'page': int(self.request.GET.get('page', DEFAULT_PAGE)),
#                 'page_size': int(self.request.GET.get('page_size', self.page_size)),
#                 'next':self.get_next_link(),
#                 'previous':self.get_previous_link()
#             }
#         })
