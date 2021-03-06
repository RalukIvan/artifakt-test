# Employee management application

Interface that allows a user to visualise a list of employees, see the commits for each employee or add an employee.

## Prerequisites

The project uses node 12, and was built over a void vuejs template (personal project template with lint, project structure and modules added by default)
## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Running tests
```
npm run test
```

### Application structure
* `__tests__` - components tests
* `components` - application components
* `store` - application state management files
* `views` - application pages
* `services` - services
* `router.js` - router configuration for the application

### Application workflow

The application has a default route (`home`) which displays the list of employees when you launch the application at `http://localhost:8080/`.
The backend requests for `employees` on page load.
If the backend responds with an error, an error message is displayed.
While the backend responds, a loader is displayed(the implementation is simplistic, I just displayed the text "loading..." :) ). When the backend request has resolved the list of employee cards will be displayed. Each of the cards display information like employee image, name, nickname, tags, description and tags.
By clicking on `+` icon button on the homepage, the user can access the add employee form (route `/new-employee`).
On this page the user can add the employee related information like first name, last name, description.
The application allows searching in the list of employees by nickname on the homepage, and by project in the list of commits on the profile page.

By clicking on the`Employee Profile` button, the user can access the employee profile page (route `/employee/:employeeId`)
When navigating to the page the informations for the employee are requested from the backend with the `employeeIdId`. The information is then displayed on the page.


### Not done
* move colors to a separate file and use them with variables
* add test to have 100% coverage. At the moment I only tested just a part of the code on just 3 components
