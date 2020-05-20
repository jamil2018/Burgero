import React, { Component } from "react";
import Modal from "../../components/UI/Modal/Modal";

const WithErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    constructor(props) {
      super();
      this.state = {
        error: null,
      };
    }
    componentWillMount() {
      this.reqInterceptor = axios.interceptors.request.use((req) => {
        this.setState({ error: null });
        return req;
      });

      this.resInterceptor = axios.interceptors.response.use(
        (res) => res,
        (error) => {
          this.setState({ error: error });
        }
      );
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }

    errorConfirmedHandler = () => {
      this.setState({ error: null });
    };
    render() {
      return (
        <>
          <Modal
            show={this.state.error}
            closeModal={this.errorConfirmedHandler}
          >
            <div style={{ textAlign: "center" }}>
              Something is wrong. Please try again later.
              <br />
              {this.state.error ? (
                <span style={{ color: "red" }}>
                  Error:{this.state.error.message}
                </span>
              ) : null}
            </div>{" "}
          </Modal>
          <WrappedComponent {...this.props} />
        </>
      );
    }
  };
};

export default WithErrorHandler;
