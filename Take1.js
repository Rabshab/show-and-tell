class App extends React.Component {
  render() {
    return (
      <Provider>
        <Router>
          <Main />
        </Router>
      </Provider>
    );
  }
}

class MusicSystemDetails extends React.Component {
  state = { isModalOpen: false };
  render() {
    return (
      <>
        <FullScreenBlurModal
          open={isModalOpen}
          onClose={() => this.setState({ isModalOpen: false })}
        >
          <p>Content Here</p>
        </FullScreenBlurModal>
        <ProductImage />
        <Button onClick={() => this.setState({ isModalOpen: true })} />
        <Settings />
      </>
    );
  }
}

class FullScreenBlurModal extends React.Component {
  getStyles = ({ open }) => ({
    root: {
      position: 'fixed',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      zIndex: 30,
      display: open ? 'flex' : 'none',
      backdropFilter: 'blur(40px)'
    }
  });

  render() {
    const styles = getStyles(this.props);
    const { onClose } = this.props;

    <div style={styles.root}>
      <CloseButton onClick={onClose} />
      {this.props.children}
    </div>;
  }
}
