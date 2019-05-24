/**
 * 异步加载组件，用于codesplit
 * @author xiaoliang
 * @date 2019-05-24
 */

import React, { Component } from 'react';

export default loader => {
  return class extends Component {
    mounted = true

    state = {
      Comp: null,
    }

    componentDidMount() {
      loader()
        .then(({ default: Comp }) => {
          if (!this.mounted) return;
          this.setState({
            Comp,
          });
        })
        .catch(() => {
          // if (!this.mounted) return
          // Toast.fail('页面加载失败了，刷新下试试吧~', 1)
        });
    }

    componentWillUnmount() {
      this.mounted = false;
    }

    render() {
      const { Comp } = this.state;
      return Comp ? <Comp {...this.props} /> : null;
    }
  };
};
