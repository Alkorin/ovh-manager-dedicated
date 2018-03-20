angular.module("App").controller("DedicatedCloudDatacentersCtrl", ($scope, $stateParams, $q, DedicatedCloud) => {
    "use strict";

    $scope.loadDatacenters = ({ offset, pageSize }) => DedicatedCloud.getDatacentersInformations($stateParams.productId, pageSize, offset - 1).then((result) => ({
        data: _.get(result, "list.results"),
        meta: {
            totalCount: result.count
        }
    })).catch((err) => {
        $scope.resetAction();
        $scope.setMessage($scope.tr("dedicatedCloud_datacenters_loading_error"), {
            message: err.message,
            type: "ERROR"
        });
        return $q.reject(err);
    }).finally(() => {
        $scope.loading = false;
    });

    $scope.hasDiscount = function (datacenter) {
        const hasDiscount = DedicatedCloud.hasDiscount(datacenter);
        if (hasDiscount) {
            $scope.discount.AMDPCC = true;
        }
        return hasDiscount;
    };
});
