angular.module("App").controller("ServerFirewallAsaEnableCtrl", ($scope, $stateParams, Server, ServerFirewallAsa) => {
    $scope.model = null;

    $scope.load = function () {
        Server.getSelected($stateParams.productId).then(
            (data) => {
                $scope.model = data;
            },
            (data) => {
                $scope.resetAction();
                $scope.setMessage($scope.tr("server_configuration_firewall_asa_enable_step1_loading_error"), data);
            }
        );
    };

    $scope.enable = function () {
        $scope.resetAction();
        ServerFirewallAsa.changeFirewallState($stateParams.productId, true).then(
            (data) => {
                $scope.setMessage($scope.tr("server_configuration_firewall_asa_enable_success"), data);
            },
            (data) => {
                $scope.setMessage($scope.tr("server_configuration_firewall_asa_enable_fail"), data);
            }
        );
    };
});
