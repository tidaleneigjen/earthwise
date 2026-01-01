// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Header from "./components/Header";
import Menu from "./components/Menu";
import Footer from "./components/Footer";
import BlogList from "./components/BlogList";
import BlogDetail from "./components/BlogDetail";
import Books from "./components/Books";

const PageLayout = ({ children }) => {
  return (
    <div className='site'>
      <Header />
      <Menu />
      <main className='site-main'>
        <div className='container'>{children}</div>
      </main>
      <Footer />
    </div>
  );
};

const Spirituality = () => {
  return (
    <>
      <h2>Spirituality</h2>
      <p>Spiritual teachings and resources will appear here.</p>
    </>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path='/'
          element={
            <PageLayout>
              <Home />
            </PageLayout>
          }
        />
        <Route
          path='/blog'
          element={
            <PageLayout>
              <BlogList />
            </PageLayout>
          }
        />
        <Route
          path='/blog/:slug'
          element={
            <PageLayout>
              <BlogDetail />
            </PageLayout>
          }
        />
        <Route
          path='/books'
          element={
            <PageLayout>
              <Books />
            </PageLayout>
          }
        />
        <Route
          path='/spirituality'
          element={
            <PageLayout>
              <Spirituality />
            </PageLayout>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
