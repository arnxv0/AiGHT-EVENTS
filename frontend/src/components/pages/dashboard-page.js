import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import UserContext from "../../contexts/userContext";
import "./dashboard-page.css";
import EventCard from "../eventCard/eventCard";
import LoadingPage from "./loading-page";
import LoadingIcon from "../loadingStuff/loading.component";
import NewEventButton from "../eventCard/newEventButton";
import CustomCheckBox from "../custom/custom-checkbox.component";
import DropDownMenu from "../dropdownMenu/dropDropComponent";
import AnimatedBackgroundComponent from "../animatedBackground/animatedBackground.component";

function DashboardPage(props) {
  const history = useHistory();
  const { user, setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [eventsList, setEventsList] = useState({ loading: true, list: [] });
  const [filteredEventsList, setFilteredEventsList] = useState({
    loading: true,
    list: [],
  });
  const [collegeList, setCollegeList] = useState({
    loading: true,
    list: ["Loading..."],
  });
  const [categoryList, setCategoryList] = useState({
    loading: true,
    list: ["Loading..."],
  });
  const [filterOptions, setFilterOptions] = useState({
    today: false,
    thisWeek: false,
    college: "All",
    category: "All",
  });

  async function updateEventsList() {
    await axios
      .get("/api/event/get")
      .then((response) => {
        setEventsList(response.events);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  /////////////////////////api calls for the first time///////////////////////////////////////

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    async function checkOrganizer() {
      await axios
        .get("/api/user/getCurrentUser")
        .then((response) => {
          if (response.data.isAuthenticated === true) {
            setUser((prevValue) => ({
              ...prevValue,
              isLoading: false,
              isOrganizer: response.data.details.isOrganizer,
            }));
          }
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    async function getCollegeList() {
      await axios
        .get("/api/configs/colleges")
        .then((response) => {
          setCollegeList({ loading: false, list: response.data.result.list });
        })
        .catch((err) => {
          console.log(err);
        });
    }

    async function getCategoryList() {
      await axios
        .get("/api/configs/categories")
        .then((response) => {
          setCategoryList({ loading: false, list: response.data.result.list });
        })
        .catch((err) => {
          console.log(err);
        });
    }

    async function getEventsList() {
      await axios
        .get("/api/event")
        .then((response) => {
          setEventsList({ loading: false, list: response.data.events });
          setFilteredEventsList({ loading: false, list: response.data.events });
        })
        .catch((err) => {
          console.log(err);
        });
    }

    checkOrganizer();
    getCollegeList();
    getCategoryList();
    getEventsList();
    return () => {
      source.cancel();
    };
  }, []);

  async function logoutUser() {
    setUser((prevValue) => ({ ...prevValue, isLoading: true }));

    await axios
      .get("/api/user/logout", { withCredentials: true })
      .then(function (response) {})
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {});

    setUser((prevValue) => ({
      ...prevValue,
      isLoading: false,
      isAuthenticated: false,
      isOrganizer: false,
    }));
  }

  // handle check boxes
  function handleCheckBoxInput(event) {
    const fieldName = event.target.id;
    console.log(fieldName, event.target);
    setFilterOptions((prevValue) => ({
      ...prevValue,
      [fieldName]: prevValue[fieldName] ? false : true,
    }));
  }

  if (loading) {
    return <LoadingPage />;
  }

  function handleNewButtonSubmit() {
    let newCollegeList = collegeList.list;
    newCollegeList.shift();

    let newCategoryList = categoryList.list;
    newCategoryList.shift();

    history.push({
      pathname: "/event/new",
      state: { collegeList: newCollegeList, categoryList: newCategoryList },
    });
  }

  function changeFilterOptions(event) {
    setFilterOptions((prevValue) => ({
      ...prevValue,
      [event.name]: event.value,
    }));
  }

  function createEventCard(eventDetails) {
    return <EventCard key={eventDetails._id} eventDetails={eventDetails} />;
  }

  function applyFilterOptions() {
    function filterCriteria(item) {
      if (filterOptions.college === "All" && filterOptions.category === "All") {
        return true;
      } else if (
        filterOptions.college === "All" &&
        filterOptions.category === item.category
      ) {
        return true;
      } else if (
        filterOptions.college === item.college &&
        filterOptions.category === "All"
      ) {
        return true;
      } else if (
        filterOptions.college === item.college &&
        filterOptions.category === item.category
      ) {
        return true;
      }

      return false;
    }

    setFilteredEventsList((prevValue) => ({
      ...prevValue,
      list: eventsList.list.filter(filterCriteria),
    }));
  }

  return (
    <>
      <div className="search-options">
        <h1 className="filter-title">Filter</h1>
        <div className="options-list-item">
          <CustomCheckBox
            handleCheckBoxInput={handleCheckBoxInput}
            id="today"
            checked={filterOptions.today}
          />
          <p className="options-list-title">Today</p>
        </div>
        <div className="options-list-item">
          <CustomCheckBox
            handleCheckBoxInput={handleCheckBoxInput}
            id="thisWeek"
            checked={filterOptions.thisWeek}
          />
          <p className="options-list-title">This week</p>
        </div>
        <div className="dashboard-dropdown-button-container">
          <DropDownMenu
            heading="College"
            name="college"
            setSelected={changeFilterOptions}
            list={collegeList.list}
          />
        </div>
        <div className="dashboard-dropdown-button-container">
          <DropDownMenu
            heading="Category"
            name="category"
            setSelected={changeFilterOptions}
            list={categoryList.list}
          />
        </div>
        <button className="apply-filter-button" onClick={applyFilterOptions}>
          Apply
        </button>
      </div>

      <div className="event-list">
        <div className="dashboard-page-particles-container">
          <AnimatedBackgroundComponent config="flickerDots" />
        </div>
        {user.isOrganizer && (
          <NewEventButton onClick={handleNewButtonSubmit}>NEW</NewEventButton>
        )}
        {eventsList.loading ? (
          <div className="event-list-loading-container">
            <LoadingIcon />
          </div>
        ) : (
          filteredEventsList.list.map(createEventCard)
        )}
      </div>

      <div className="extra-options-container">
        <button
          className="logout-button"
          onClick={async function () {
            await logoutUser();
            history.push({
              pathname: "/dashboard",
            });
          }}
        >
          <img
            src="images\logoutIcon\logoutIcon.png"
            alt="logout"
            className="logout-button-icon"
          />
        </button>
      </div>
    </>
  );
}

export default DashboardPage;

//<i class="fas fa-sign-out-alt fa-3x"></i>
