import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Hero from "./components/HeroSec/jsx/Hero";
import Categories from "./components/Categories/Categories";
import ViewCourses from "./components/ViewCourses/ViewCourses";
import AddCourse from "./components/AddCourse/Addcourse";
import CourseDetails from "./components/CourseDetails/CourseDetails";
import EditCourse from "./components/EditCourse/EditCourse";
import Cart from "./components/Cart/Cart";
import MyLearning from "./components/MyLearning/MyLearning";

import Thero from "./components/Teach/HeroTeach/Thero";
import AddForm from "./components/Teach/AddForm/Addform";
import BecomeInstructor from "./components/Teach/BecomeInstructor/BecomeInstructor";
import ViewInstructor from "./components/Teach/Instructors/viewInstructor";
import InstructorDetails from "./components/Teach/Instructors/InstructorDetails";
import EditInstructor from "./components/Teach/Instructors/EditInstructor";
import ReasonsSection from "./components/Teach/TeachSec/ReasonSec/ReasonsSection";
import HowToBegin from "./components/Teach/TeachSec/HowToBegin/HowToBegin";
import TestimonialSlider from "./components/Teach/TeachSec/TestimonialSlider/TestimonialSlider";
import SupportSection from "./components/Teach/TeachSec/SupportSection/SupportSection";

const AppRoutes = () => {
  const [filter, setFilter] = useState("All");

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Hero />
            <Categories setFilter={setFilter} />
            <ViewCourses filter={filter} />
          </>
        }
      />
      <Route path="/add-course" element={<AddCourse />} />
      <Route path="/course/:id" element={<CourseDetails />} />
      <Route path="/edit/:id" element={<EditCourse />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/my-learning" element={<MyLearning />} />
      <Route
        path="/teach"
        element={
          <>
            <Thero />
            <ReasonsSection />
            <HowToBegin />
            <TestimonialSlider />
            <SupportSection />
            <BecomeInstructor />
          </>
        }
      />
      <Route path="/get-started" element={<AddForm />} />
      <Route path="/view-instructors" element={<ViewInstructor />} />
      <Route path="/instructor/:id" element={<InstructorDetails />} />
      <Route path="/edit-instructor/:id" element={<EditInstructor />} />
    </Routes>
  );
};

export default AppRoutes;
