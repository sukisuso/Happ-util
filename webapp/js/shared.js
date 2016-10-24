function newToast(scope, msg){
	scope.show(
      scope.simple()
        .textContent(msg)
        .position("top right")
        .hideDelay(3000)
    );
}