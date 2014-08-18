Application.Directives.directive('board', ['$window', '$q', '$stateParams', '$timeout',   '$filter', '$compile', 'ComponentService', '$state',
    function($window, $q, $stateParams, $timeout,  $filter, $compile, ComponentService, $state) {

        function albumPicker(svg, margin, width, height, scope) {

            var albumPicker             = {};

            var randomIntFromInterval   = function (min,max){return Math.floor(Math.random()*(max-min+1)+min);}

            albumPicker.clear = function() {
                svg.selectAll('*').remove();
                return albumPicker;
            }

            albumPicker.board = function() {

                svg.append("rect").attr("class", "zoomable").attr("width",  width).attr("height", height);

                albumPicker.group  = svg
                    .selectAll('.cardgroup')
                    .data(scope.albums)
                    .enter()
                    .append('g')
                    .attr("class", "cardgroup")
                    .on("mouseover", function(d) {
                        scope.cardPreview = d;
                        scope.$apply();
                    }).on("mouseout", function(d) {
                        scope.cardPreview = {};
                        scope.$apply();
                    })

                albumPicker.group
                    .append('foreignObject')
                    .attr('class', 'id')
                    .attr("x",      function(d, i) {return i * 300})
                    .attr("y",      function(d, i) {return i * 320})
                    .attr('width', 640)
                    .attr('height', 640)
                    .attr("transform", function(d, i) {return "rotate(" + randomIntFromInterval(-4, 4) + ","+ (i * 200+320/2) + ","+ (i * 320 + 320/2) +")"})
                    .html(function(d) {return '<img src="https://i.scdn.co/image/f2798ddab0c7b76dc2d270b65c4f67ddef7f6718"/>'})

                return albumPicker;
            }

            albumPicker.zoom = function() {
                svg.call(d3.behavior.zoom()
                    .translate([0, 0])
                    .scale(1)
                    .scaleExtent([0.1, 5.0])
                    .on("zoom", function() {
                        albumPicker.group.attr("transform", "translate(" + d3.event.translate[0] + "," + d3.event.translate[1] + ") scale(" + d3.event.scale + ")")
                    })
                )

                return albumPicker;
            }



            return albumPicker;
        }

        return {
            template: '<div> </div>',
            restrict: 'E',
            controller: function ($scope) {
              $scope.albums = [1,2,3,4,5,6];
            },

            link: function (scope, ele, attrs) {

                var w = window,
                    d = document,
                    e = d.documentElement,
                    g = d.getElementsByTagName('body')[0],
                    x = w.innerWidth || e.clientWidth || g.clientWidth,
                    y = w.innerHeight|| e.clientHeight|| g.clientHeight;

                var  margin = 30, svg = d3.select(ele[0]).append("svg").attr("width", x).attr("height", y);

                scope.$watch('albums', function() {
                    if (scope.albums) scope.board = new albumPicker(svg, margin, x, y, scope).clear().board().zoom();

                });



            }
        }

    }]);


