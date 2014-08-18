from twisted.internet import reactor
from twisted.web import proxy, server
from twisted.web.resource import Resource
from twisted.web.static import File

class EchoNestProxy(Resource):
    isLeaf = False
    allowedMethods = ('GET')
    def getChild(self, params, request):
        print params
        return proxy.ReverseProxyResource('developer.echonest.com', 80, '')

apiresource         = Resource()
echonestproxy       = EchoNestProxy()
staticresource      = File('../www/static')

apiresource.putChild('playlist',  echonestproxy)
apiresource.putChild('static', staticresource)

site = server.Site(apiresource)
reactor.listenTCP(8082, site)
reactor.run()