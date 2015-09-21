//Todoコントローラー
    function TodoController($scope){
        $scope.todos = [
            {text:'シャンプー購入', done:true},
            {text:'腹筋100回',done:false},
            {text:'ヤマダさんと会食',done:false}
        ];

        $scope.addTodo = function(){
            if ($scope.textf) {
                $scope.todos.push({text:$scope.textf,done:false});
                $scope.textf = '';
            }
        };

        $scope.clear = function() {　　//※15
            var oldTodos = $scope.todos;
            $scope.todos = [];
            angular.forEach(oldTodos, function(oresama) {
                if (!oresama.done) $scope.todos.push(oresama);
            });
        };
    }