# SEI-Project-4: FASTival
by [Sandra Spighel](https://www.linkedin.com/in/sandraspighel/) - [HotSauceNinja](https://github.com/HotSauceNinja)

![home](https://github.com/HotSauceNinja/SEI-Project-4-FASTival/blob/main/README%20images/Home_page.gif?raw=true)

👉 [<b>TRY ME</b>](https://fastival.herokuapp.com/) 👈
# Table of Contents

  - [Short Description](#short-description)
  - [Background](#background)
  - [Technology Used](#technology-used)
  - [Install](#install)
  - [How To Use FASTival](#usage)
  - [Project Development](#project-development)
    - [User Model](#the-user-model)
    - [Authentication](#authentication)
    - [Other Models](#other-models)
    - [Implementing Relationships](#implementing-remationships)
    - [Seeding](#seeding)
    - [Front End](#front-end)
    - [Registering a User](#registering-a-user)
    - [Forms](#forms)
    - [Scheduling](#scheduling)
    - [Restructuring](#restructuring)
    - [Mapbox API](#mapbox-api)
  - [Final Thoughts & Project Wrap](#final-thoughts-and-project-wrap)
  - [License](#license)
## Short Description
Platform aiming to optimise film festival scheduling

## Background
In Film Festivals, scheduling is a lengthy process where huge wooden boards and hundreds of paper cards are used to plan screenings across the multiple contracted cinema screens. 

FASTival was created with the intention to optimise this process by making it fully digital, and hence much friendlier for the environment.

This is the fourth (and last) project in the General Assembly Software Engineering Immersive course. Working solo, I had 8 days to develop a full stack application: back end with a Python Django API using Django REST Framework to serve data from a Postgres database, and a separate front end built with React. 

## Technology Used
### Languages Used
- [Python](https://www.python.org/)
- [JavaScript](https://www.javascript.com/)
- [SASS](https://sass-lang.com/)
### Frameworks & Libraries
- [Django](https://www.djangoproject.com/) - Python Web framework 
- [React Hooks](https://reactjs.org/docs/hooks-intro.html) - JavaScript library for creating user interfaces
- [Bulma](https://bulma.io/) - Open source CSS framework
### Dependencies & Components
- [Axios](https://github.com/axios/axios) - Promise based HTTP client for the browser and node.js
- [Moment](https://momentjs.com/) - JavaScript date library for parsing, validating, manipulating, and formatting dates - used in combination with React Big Calendar
- [React-Big-Calendar](https://jquense.github.io/react-big-calendar/examples/index.html) - Events calendar component for React using flexbox
- [React-Icons](https://react-icons.github.io/react-icons/)
- [React-Map-GL](https://docs.mapbox.com/mapbox-gl-js/api/) - suite of React components designed to provide a React API for Mapbox GL JS-compatible libraries
- [React-Router-Dom](https://reactrouter.com/) - DOM bindings for React Router
- [React-Select](https://react-select.com/home) - Select Input control for ReactJS
---

## Install
* Clone or download the repo 
* Install back-end dependencies: <code>pipenv</code>
* Enter the project shell: <code>pipenv shell</code>
* Make migrations: <code>python manage.py makemigrations</code>
* Migrate: <code>python manage.py migrate</code>
* Load seed data for Users: <code>python manage.py loaddata jwt_auth/seeds.json</code>
* Load seed data for Sections: <code>python manage.py loaddata sections/seeds.json</code>
* Load seed data for Cinemas: <code>python manage.py loaddata cinemas/seeds.json</code>
* Load seed data for Genres: <code>python manage.py loaddata genres/seeds.json</code>
* Load seed data for Scheduling Slots: <code>python manage.py loaddata scheduling_slots/seeds.json</code>
* Load seed data for Films: <code>python manage.py loaddata films/seeds.json</code>
* Start back end server: <code>python manage.py runserver</code>
* Install dependencies in the client folder: <code>cd client && yarn</code>
* Start the server (remaining in client folder): <code>yarn start</code>

## How To Use FASTival

### Prerequisites

The website is mobile friendly and the user can access it through the browser. 
#### User journey

Non-logged in staff can easily consult the scheduling updates at a glance by accessing the film list and the screening schedule without needing to log in. 

![home page](https://github.com/HotSauceNinja/SEI-Project-4-FASTival/blob/main/README%20images/Home_page.gif?raw=true)

However, only logged in staff can make changes to the database and the schedule. Here is the process of registering a user:

![register user](https://github.com/HotSauceNinja/SEI-Project-4-FASTival/blob/main/README%20images/register_user.gif?raw=true)

Logged in users can create screening slots representing contracted venue hires in place, upload film information based on accepted titles, and schedule these across the available slots. The Screening Schedule can be viewed in multiple formats:

![schedule views](https://github.com/HotSauceNinja/SEI-Project-4-FASTival/blob/main/README%20images/schedule_views.gif?raw=true)

Users can create films and allocate them to slots:

![Add film](https://github.com/HotSauceNinja/SEI-Project-4-FASTival/blob/main/README%20images/Add_film.gif?raw=true)

If a slot must be modified, it can be done so easily by double clicking it and editing the film, times and/or cinema. 

![Change Film](https://github.com/HotSauceNinja/SEI-Project-4-FASTival/blob/main/README%20images/change_film.gif?raw=true)

A used can edit or delete films they created. If a film is deleted, its scheduling slot is reset to a vacant slot. This can be left empty or repopulated with a different title:

![delete film](https://github.com/HotSauceNinja/SEI-Project-4-FASTival/blob/main/README%20images/delete_film.gif?raw=true)

A user can also view cinemas and the screening slots they host:

![cinemas](https://github.com/HotSauceNinja/SEI-Project-4-FASTival/blob/main/README%20images/Cinemas.gif?raw=true)

---
# Project Development

I first set up a Django project and created the FASTival django database.

I then started creating my models, based on the ERD Diagram drafted when pitching the project. 

![ERD Diagram](https://github.com/HotSauceNinja/SEI-Project-4-FASTival/blob/main/README%20images/ERD.png?raw=true)

### The User model
I created a new folder, jwt_auth, and added 'jwt_auth' to my installed apps within the settings.py file in project folder, and linked it to the User model within the same folder:
<code>AUTH_USER_MODEL = 'jwt_auth.User'</code>

I then navigated to my jwt_auth folder and created my User model in models.py, by extending the existing Django User model:

```
from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    """ Extending the existing django User model """

    email = models.CharField(max_length=50, unique=True) 
    username = models.CharField(max_length=50, unique=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    profile_photo = models.CharField(max_length=300)
```

With the model in place, I had Django check my new model and prepare to create the table for it in the database, using the make migrations command: <code>python manage.py makemigrations</code>

And then migrated to run the changes: <code>python manage.py migrate</code>

I then had to register the new app with the admin.py site in its app folder:
```
from django.contrib import admin
from django.contrib.auth import get_user_model

User = get_user_model()

admin.site.register(User)
```

And tested everything works fine by running the server with <code>pythong manage.py runserver</code> and visiting the admin app `localhost:8000/admin`. 
I should be able to log in with my super user, but had I not created this when I set up the project, I can easily do so now by typing the following command in Terminal: <code>python manage.py createsuperuser</code> and filling the options required.

![log in to CMS](https://github.com/HotSauceNinja/SEI-Project-4-FASTival/blob/main/README%20images/django_admin.png?raw=true)
### Authentication
Because I needed users to be able to register via the API, I added the Python Json Web Token package:  <code>pipenv install pyjwt</code>

I first did my secure route to be able to check if incoming requests have a valid token, and restrict access otherwise. I created the file authentication.py within my jwt_auth folder:
```
from rest_framework.authentication import BasicAuthentication
from rest_framework.exceptions import PermissionDenied
from django.contrib.auth import get_user_model
from django.conf import settings
import jwt

User = get_user_model()

class JWTAuthentication(BasicAuthentication):
``` Deals with incoming request, this will be applied over every route and will determine what users are able to do once they are through the authentication```

    def authenticate(self, request):
        header = request.headers.get('Authorization')

        if not header:
            return None
        
        if not header.startswith('Bearer'):
            raise PermissionDenied(detail='Invalid Token Format')

        token = header.replace('Bearer ', '')

        try:
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
            user = User.objects.get(pk=payload.get('sub'))
        except jwt.exceptions.InvalidTokenError:
            raise PermissionDenied(detail='Invalid Token')
        except User.DoesNotExist:
            raise PermissionDenied(detail='User Not Found')

        return (user, token)
```

I then added my custom authentication settings to the `project/settings.py`.

It was also time to add a user serializer to be able to view my user model information, which I created in the serializers folder.
In order to implement register and login functionality, I made the views.py that would handle my server requests and send back responses, and then set up my URL patterns for paths. The only thing left to do was write my login and issue the token: 
```
User = get_user_model()

class RegisterView(APIView):
    """ View for post request to /auth/login """

    def post(self, request):
        # request data going into the UserSerialiser to be converted
        user_to_create = UserSerializer(data=request.data)
        if user_to_create.is_valid():
            user_to_create.save()
            return Response(
                {'message':'Registration Successful'},
                status=status.HTTP_201_CREATED
            )
        return Response(user_to_create.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

class LoginView(APIView):
    """ View for post request to /auth/login """

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        # search for the user in db by email
        try:
            user_to_login = User.objects.get(email=email)
        # if email not found in db, permission denied
        except User.DoesNotExist:
            raise PermissionDenied(detail='Invalid Credentials')

        # if there is an email associated but the password does not match, permission denied
        if not user_to_login.check_password(password):
            raise PermissionDenied(detail='Invalid Credentials')
        
        # otherwise they can have a token; set token expiry time:
        expiry_time = datetime.now() + timedelta(days=7)
        # and encode the token:
        token = jwt.encode({
            'sub':user_to_login.id,
            'exp':int(expiry_time.strftime('%s'))},
            settings.SECRET_KEY,
            algorithm='HS256'
        )

        return Response({'token':token, 'message':f'Welcome back {user_to_login.username}'})
```

### Other Models
Once my User model was in place, I proceeded with creating my other 5 models one by one, following the same steps:
* Start a new app within the project for each new model
* Register the app in project/settings.py
* Create the model in models.py
* Establish any foreign key relationships
* Make migrations and then migrate
* Register the app within admin.py (adding a string method to the class to make items easier to read in the admin app)
* Test by running the server and visiting <code>localhost:8000/admin</code> to check the models

As an example, here is my Film model along with its implemented relationships, which I will discuss next:
```
from django.db import models
from django.core.validators import MinValueValidator

# Film model
class Film(models.Model):
    title = models.CharField(max_length=50, unique=True)
    director = models.CharField(max_length=100)
    year_released = models.PositiveIntegerField(validators=[MinValueValidator(1900)])
    country = models.CharField(max_length=50)
    run_time = models.DurationField()
    plot = models.CharField(max_length=600)
    poster = models.CharField(max_length=500)
    distributor = models.CharField(max_length=50)
    film_format = models.CharField(max_length=50)
    submission_date = models.DateTimeField(auto_now_add=True)

    # Many to Many Relationships:
    genre = models.ManyToManyField('genres.Genre', related_name='films')
    section = models.ManyToManyField(
      'sections.Section',
      blank=True,
      related_name='films')

    # One to many Relationship - a user can create many films
    creator = models.ForeignKey(
      "jwt_auth.User",
      related_name="posted_films",
      # If a user is deleted I want to still be able to access the films they created
      on_delete=models.DO_NOTHING
    )

    def __str__(self):
        return f"{self.title} - {self.director}"
```
And here it is viewed in Insomnia:

![film object](https://github.com/HotSauceNinja/SEI-Project-4-FASTival/blob/main/README%20images/film_object.png?raw=true)

### Implementing relationships
#### One to Many
For establishing the One to Many relationships, I created in "ONE" / serialisers folder a populated.py file where I established the relationship to the "MANY". As an example, here is my populated.py file for films:
```
class PopulatedFilmSerializer(FilmSerializer):
    """ Used for all outgoing serialization """

    slots = SlotSerializer(many=True)
    genre = GenreSerializer(many=True)
    section = SectionSerializer(many=True)
    # shows the creator of this film:
    creator = NestedUserSerializer()
```

I then created a view in  the app's views.py to replace the standard Django imports with the Django REST framework version, and hooked up the urls(routes) the same as I would for a vanilla Django app, by adding within the url patterns.

#### Many to Many
For a Many to Many relationship, I established the foreign key relationship on one of the two models (the example is using the film model):
```
    # Many to Many Relationships:
    genre = models.ManyToManyField('genres.Genre', related_name='films')
    section = models.ManyToManyField(
      'sections.Section',
      blank=True,
      related_name='films')
```
I then made migrations and migrated again, and afterwards created a new serializer called populated.py for any model which required nesting (the example uses the genre populated.py file):
```
from films.serializers.common import FilmSerializer
from ..serializers.common import GenreSerializer

class PopulatedGenreSerializer(GenreSerializer):
    """ Used for all outgoing serialization """

    films = FilmSerializer(many=True)
```
And then added the populated serializer in the view.py (this example is from the genre views.py) so that when we request to see all the genres, the films will also be passed with the request:
```
class GenreListView(APIView):
    """ View for get request to /genres """

    def get(self, _request):
        genres = Genre.objects.all()
        serialized_genre = PopulatedGenreSerializer(genres, many=True)
        return Response(serialized_genre.data, status=status.HTTP_200_OK)
```

### Seeding
I did the majority of seeding in the evenings, after wrapping with that day's work. I followed the same process for all my models and uploaded all the information via the localhost admin site. Once I had enough data, I would have Django create a seeds file automatically from the data that already existed in the table: <code>python manage.py dumpdata app-name --output app-name/seeds.json --indent=2</code>
and then flushed the database and loaded the data from the seeds file back in.
Below is an example of seeding data from TablePlus:

![Table Plus](https://github.com/HotSauceNinja/SEI-Project-4-FASTival/blob/main/README%20images/Table_Plus.png?raw=true)

### Front End
As per the project requirements, I used React for the front end. Mounting the front end was straight forward, and having already done this previously for [Project 3 (DEVERR)](https://github.com/HotSauceNinja/SEI-Project-3-DEVERR) definitely helped get through it faster. 

After establishing my website structure by writing basic components for my main links, I added the routes in App.js and Nav.js, and imported Bulma to do a basic styling as I go. My plan was to return and continue styling once my main components are all in place and functioning correctly. 

I went one by one and created components for the home, navbar, the footer, the schedule (to host the main part of my app) and the cinemas.
I then proceeded with shaping each page and implementing the request functionality into my components as required.

The steps I followed were overall similar: 
* Creating a format scaffolding in each component using JSX and Bulma classes
* Writing the requests one at a time (getting data through async functions with try / catch blocks in place, and setting into State)
* Testing everything as I went along:
  * First in Insomnia to make sure the request to my back end was working accurately and check the format the data is sent in
  * Then in my console through logging the data at each step
  * And last ensuring it shows on the page itself
* I would then refactor my code to break it into smaller components that I could import in the main one or reuse if required
* I later added error handling (through using State) and updated the try / catch block to set the errors.
* For the components which required redirecting, I used History from react-router-dom to push a new url into the history array, and Location to refresh the page.

As an example of how I structured the components, the film folder was composed of:
1. FilmIndex.js - Showing all films
2. FilmCard.js - Used in the FilmIndex component, this is a subcomponent containing the format of a film card
3. FilmShow.js - Showing one particular film (found through its id)
4. FilmNew.js - The page a user is directed when wanting to create a new film 
5. FilmForm.js - The form used to create a new film (I later refactored a part of this into a useForm component to make it reusable)
6. FilmEdit.js - Importing the film in formation into a form so the user can modify as required.

Here is a photo with my folder structure, I followed the same process described above for the Cinemas and Slots. 

![Folder Structure](https://github.com/HotSauceNinja/SEI-Project-4-FASTival/blob/main/README%20images/folder_structure.png?raw=true)

### Registering a User
Followed similar steps as above for Registration until the point where I submitted the new user form, from where I took a different path for Login.
In my lib folder from components, I created a new file, auth.js to handle tokens:
```
// * Set user token
export function setToken(token) {
  window.localStorage.setItem('token', token)
}

// * Get user token
export function getToken() {
  return window.localStorage.getItem('token')
}

// * Logout a user
export function logoutUser() {
  window.localStorage.removeItem('token')
} 
```
I then used SetToken within my Login function to set the user token if login is successful. 

I also wrote further functions in my auth.js to check the token and establish if the user is authenticated and the owner of a particular element based on their token:
```
// * Get payload
export function getPayload() {
  const token = getToken()
  if (!token) return false
  const parts = token.split('.')
  if (parts.length < 3) return false
  return JSON.parse(atob(parts[1]))
}

// * Checks if token is valid
export function isAuthenticated() {
  const payload = getPayload()
  if (!payload) return false
  const now = Math.round(Date.now() / 1000)
  return now < payload.exp
}

export function isOwner(userId) {
  const payload = getPayload()
  if (!payload) return false
  return userId === payload.sub
}
```

These functions then helped me implement authentication and different outcomes based on existence of a token. For example, my navbar displayed different options depending on login status:
```
<div className="navbar-item has-background-dark has-text-info-light">
  User
</div>
{ !isLoggedIn ?
  <div className="navbar-dropdown has-background-dark is-right ">
    <Link to="/login/" className="navbar-item has-text-info">
      Login
    </Link>
    <Link to="/register/" className="navbar-item has-text-info">
      Register
    </Link>
  </div>
 :
  <div className="navbar-dropdown has-background-dark is-right">
      <button className="navbar-item button is-small is-left is-dark has-text-info"
      onClick={handleLogout}>
        Logout
      </button>
  </div>
}
```
I also restricted adding films to authenticated users only, and editing and deleting films to be allowed only to the user who created the film:
```
 { isOwner(film.creator.id) &&
          <div className="field is-grouped is-right">
            <p className="control">
              <button className="button is-success">
                <Link to={`/films/${id}/edit/`}>
                  Edit Film
                </Link>
              </button>
            </p>
            <p className="control">
              <button className="button is-danger" 
              onClick={handleDelete}> 
                Delete Film
              </button>
            </p>
          </div>
  }
``` 

### Forms
Getting my forms to fully function was by far the biggest challenge of this project. I will outline below the part which I found the most challenging.

I decided to use [React Select](https://react-select.com/home) to allow a user to select more than one genre when creating or editing a film. In implementing this into my FilmForm, I added a genre select option:
```
const genreSelectOptions = [
  { value: 1, label: 'Thriller' },
  { value: 2, label: 'Comedy' },
  { value: 3, label: 'Documentary' },
  { value: 4, label: 'Drama' },
  { value: 5, label: 'Family' },
  { value: 6, label: 'Horror' },
  { value: 7, label: 'Adventure' },
  { value: 8, label: 'Action' },
  { value: 9, label: 'Musical' },
  { value: 10, label: 'Sci Fi' },
  { value: 11, label: 'Animation' }
]
```
A const to handle multi selection change:
```
  const handleMultiSelectionChange = (selected, name) => {
    const selectedOption = selected ? 
      selected.map(item => item.value) 
      : 
      []
    handleChange({ target: { name, value: selectedOption } })
  }
```
And included both in my returned JSX:
```
            <div className="field">
              <label className="label has-text-info">
                Genres
              </label>
              <div className="control" >
                <Select
                  options={genreSelectOptions}
                  isMulti
                  onChange={selected => handleMultiSelectionChange(selected, 'genre')}
                />
              </div>
            </div>
            {errors && <p className="help is-danger">{errors.genre}</p>}
```
However, having this select form in place along with a many to many relationship between genres and films meant that my data object was taking a different shape when it arrived in my FilmEdit, which generated the following error: 

![console log pk error](https://github.com/HotSauceNinja/SEI-Project-4-FASTival/blob/main/README%20images/console_log_pk_error.png?raw=true)

The solution meant finding a way to reformat the data before sending it into handleSubmit, to ensure data is in the format required when sending the request:
```
 const handleSubmit = async event => {
   event.preventDefault()
   const filmToEdit = {
     ...formdata,
     creator: formdata.creator.id,
     genre: formdata.genre.map(genre => {
       if (typeof genre === 'object') { 
         // * we can see if the genre was an object
         return genre.id 
         // * in which case return its id
       }
       return genre 
       // * or it was already a number, so just return it back as is
     })
   }
   console.log('updated film to send', filmToEdit) 
   // * updated information
 
   try {
     const response = await editFilm(id, filmToEdit)
     console.log(response) 
     // * checking how this looks
     history.push(`/films/${id}/`)
   } catch (err) {
     setErrors(err.response.data)
   }
 }
```
### Scheduling
The Scheduling was what I thought of as my most complex component. My plan involved getting all the scheduling slots (either free or with their linked film), importing the React Big Calendar and then showing all the slots within this.

![styled calendar](https://github.com/HotSauceNinja/SEI-Project-4-FASTival/blob/main/README%20images/styled_claendar.png?raw=true)

I took the following steps:
* Imported moment for time localization:
```
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'

function SchedulingSlots(){
  const localizer = momentLocalizer(moment)
...
```
* I requested the array of scheduling slot objects, and then sorted them in chronological order:
```
  // * Get the array of scheduling slots objects
  React.useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await getAllSlots()

        // * Sort all slots in chronological order
        const sortedData = data.sort((a, b) => Date.parse(a.startTime) - Date.parse(b.startTime))

        setSlots(sortedData)
      } catch (err) {
        setHasErr(err)
      }
    }
    getData()
  }, [])
```
* I then formatted the array to have the shape required by the Calendar component so the slots could be recognised and displayed:
```
  // * Format events array of objects for showing on calendar 
  // * or do nothing if slots are null
  const events = slots && slots.map(slot => { 
    return {
      id: slot.id,
      title: !slot.film ? 'Free slot' : slot.film.title,
      allDay: false,
      start: new Date(slot.startTime),
      end: new Date(slot.endTime),
      resource: slot.cinema.name
    }
  })
```
* And displayed the Calendar onto my page:
```
        {!slots ? // * Only render the calender if slots exist
          <div className="hero is-fullheight title">
            { hasErr ?
              <div className="hero-body">
                <div className="container has-text-centered">
                  Something went wrong
                </div>
              </div> 
              : 
              <div className="hero-body">
                <div className="container has-text-centered">
                  Loading
                </div>
              </div>
            }
          </div>
          :
          <Calendar
            popup
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            defaultDate={new Date(2021, 5, 14)}
            defaultView="week"
            style={{ height: '100vh' }}
            onDoubleClickEvent={handleDoubleClick}
          />
        }
```
* Last, I wrote a small function to allow editing a slot by double clicking it:
```
  function handleDoubleClick (event) {
    isLoggedIn ? 
      history.push(`/slots/${event.id}/edit/`)
      :
      history.push('/login/')
  }
```

### Restructuring
My initial plan included a user page where the user would be directed after a successful login. However, as I reached my MVP later than I had initially planned, I had to decide in between:
1. Keeping to the initial plan but risking not to have enough time to fully style the website.
2. Cutting the user page out and focusing on styling the website, with the possibility of adding other small improvements once this is in place.

I decided to go with the second option, which I still feel was the best choice. 

I used the gained time to find an image for the home page and liaise with a friend to help me add my logo onto it, and to create a second image using a blue tint, which I could then switch to when the mouse went over.

I then implemented my colour scheme throughout the website - I decided to go for a dark mode to reduce eye strain, as I expected my users to spend lengthy intervals looking at the Scheduling page when planning the festival. 
I also opted for blue as it is a colour invoking calm, but also confidence and stabillity. I wanted my website to look professional and clean, and to allow easy navigation by drawing the eyes towards the important elements through use of colour. 

The only down side with my choice was the fact that I could not get the colour changes I made to the Calendar component to persist - resulting in the top buttons of the Calendar resetting to grey writing and transparent background, which makes the user experience less enjoyable. However, they do change colour upon hover, which helps with readability.

### Mapbox API
As I had a few hours left until the project deadline, I decided to restructure my cinemas page and implement a map using the Mapbox API.

I refactored my code to allow all cinemas to be displayed on the cinema page, and then enabled showing a detailed version of each when the user selected one:

![Cinemas page](https://github.com/HotSauceNinja/SEI-Project-4-FASTival/blob/main/README%20images/cinema_page.png?raw=true)

I then imported my map into the ShowCinema component:
```
<div className="column is-half map-container">
  <ReactMapGL
    mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
    height="100%"
    width="100%"
    mapStyle="mapbox://styles/mapbox/dark-v10"
    latitude= {parseFloat(latitude)}
    longitude= {parseFloat(longitude)}
    zoom= {14}
  >
    <Marker 
      latitude= {parseFloat(latitude)}
      longitude= {parseFloat(longitude)}
    >
      📍
    </Marker>
  </ReactMapGL>
</div>
```

More in depth information is available via the [extended README documentation](https://docs.google.com/document/d/1d4Fy95T7abMTXSo2sN6QJFxId9cTZP9_UTMGY7qJb94/edit?usp=sharing)

# Final Thoughts and Project Wrap
## Wins
* I managed to pull off a lot of functionality and content in the given timeframe, which I am very happy with. I was told by one of my colleagues that my website looks and feels like an actual platform, which made me very happy.
* I really enjoyed working with Django and went through great lengths to understand, and then exploit my back end knowledge to shape my models into stable elements that can support and enhance my functionality. 

## Challenges / Bugs
* The most challenging part of this project was related to forms. I have detailed my issues and the resolving process [here](#forms), and what I take away from this is the fact that I have a stronger understanding of both the submitting a form process, and working with different types of data structures. 
* When editing a film made previously, the genre and section would not be displayed in the respective fields. They could still be changed, and if they were left as they were they would just retain the previous values. I am still to find a solution to this issue.
* Hosting the website on Heroku was free, but it comes with the inconvenience that it loads very slowly, which gives users the impression it is not functional. My data takes a long time to appear, which cripples the user exeprience, and there were also times when I was not able to use the website at all because the server was unavailable.

## Key Learnings
* I have a stronger understanding of forms and of converting to different types of data structures. 
* I am more confident with integrating maps into a page.
* Before starting this project, I was not familiar with the earlier versions of React as we have been working solely with [Hooks](https://reactjs.org/docs/hooks-intro.html) in class. Choosing to work with react-big-calendar meant I had to be able to read class-based React syntax, which was challenging at first, but I think I gained a clearer understanding of it.

## Possible future features
* Writing a new Calendar component that can be shaped to better contain the schedule. The current implementation (React Big Calendar) works to illustrate the purpose of this app, but is very limited in usability and functionality. 
Further calendar implementations could include:
  * Adding rows for each cinema on the week view
  * Adding the cinema name and slot duration onto the slot card
  * Styling the component to customise colours throughout
  * Assigning a different colour to free slots to make them stand out
  
* Adding a User page and the possibility for users to edit or delete their profile.
* Adding a summary page where users can see statistics like the total number of films, slots, cinemas, sections etc.
* Allowing users to edit or add genres and sections.
* Adding types of users with different levels of permission.
---
## Contributing to this project
If you have suggestions for improving this project, please [open an issue on GitHub](https://github.com/HotSauceNinja/SEI-Project-4)
## License & copyright
This project was build for educational purposes. All the information on the website is fictitional (including names, contact details and film information). No copyright infringement is intended and all content is used under educational license. 

©️ [Sandra Spighel](https://www.linkedin.com/in/sandraspighel/)
