;; A.2 자바스크립트용 함수형 프로그래밍 언어

;; A.2.1 클로저 스크립트

(defn hi [name]
  (.log js/console (str "Hello " name "!")))

(hi "ClojureScript")

;; (console) Hello ClojureScript
