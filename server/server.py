from twisted.internet import reactor
from twisted.web import proxy, server
from twisted.web.resource import Resource
from twisted.web.static import File

class BugzillaProxy(Resource):
    isLeaf = False
    allowedMethods = ("GET")
    def getChild(self, name, request):
        print name
        return proxy.ReverseProxyResource('bugzilla.cyantechnology.local', 80, "/" + name)

apiresource         = Resource()
bugzillaproxy       = BugzillaProxy()
staticresource      = File('../www/static')

apiresource.putChild('proxy',  bugzillaproxy)
apiresource.putChild('static', staticresource)

site = server.Site(apiresource)
reactor.listenTCP(8081, site)
reactor.run()