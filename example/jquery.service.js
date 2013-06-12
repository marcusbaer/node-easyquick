(function($){

    $.fn.callService = function (serviceName, serviceData, successCallback) {
        var callService = function (serviceName, serviceData, successCallback) {
            var type = 'GET';
            var data = {};
            if (serviceData && typeof serviceData === 'object') {
                type = 'POST';
                data = serviceData;
            } else {
                successCallback = serviceData;
            }
            $.ajax({
                type: type,
                url: "service/" + serviceName,
                data: JSON.stringify(data),
                context: document.body
            }).done(function(response) {
                    if (successCallback) {
                        successCallback(response);
                    }
                });
        };
        callService(serviceName, serviceData, successCallback);
        return this;
    };

})(jQuery);
