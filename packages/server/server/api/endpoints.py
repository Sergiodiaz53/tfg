from drf_auto_endpoint.endpoints import Endpoint
from ..models import History


class HistoryEndpoint(Endpoint):

    model = History
    include_str = False
