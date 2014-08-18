Application.Filters.filter('stripEmail', function () {

    return function (text) {
        var result = text || "";
        return result.split("@")[0].split(".").join(" ");
    };
});