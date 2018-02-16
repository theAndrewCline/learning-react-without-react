# learning-react-without-react

## Idea behind this project
So this project is going to be an attempt to teach new people to react the methodologies to react without needing to pull in the tooling and mess with jsx and babel/webpack/create-react-app. To follow along with this you will need to already have a pretty good handle on HTML, CSS, and JS. You will be exposed to a lot of ES6 features like classes, arrow functions, const and let, template literals, the spread operator, and the object literal shorthand. You will also be exposed to consistent use of the ternary operator and using array methods like forEach, map, filter, and reduce.

It is more or less a replica of the simple todomvc.com app that they use to demonstrate different workflows for different frameworks for the same project. This app covers maybe 90% of the functionality and look and feel, because the point is not to focus on the CSS or every little detail but instead to demonstrate a way to approach react development.

## Some of the React basics covered
We are focusing primarily on one-way dataflow, using ES6 classes, keeping track of the state, keeping logic out of the template/view, using imports, and updating state when the user interacts with the view by using the setState method (which is a hacked up one in here).

## Things (unfortunately) not consistent with React
We are not able to use the synthetic event system provided by react so we have to manually add new event listeners after every render which does not look like react at all which is probably the biggest syntactic difference in this small project. We are not (currently) using any kind of lifecycle hooks, but might add a willMount hook in the future for the initialization stage and grabbing data from an API.

We are not worrying about the virtual DOM and so in our application we blow away the DOM and rebuild every render (which doesn't seem to be a problem for this small app but obviously is a terrible idea for any real application in development).
