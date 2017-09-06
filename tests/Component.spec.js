module.exports = ({h, Component, render, PureComponent}) => {
	test('Lifecycle', ({ok, end}) => {
		var container = document.createElement('div')

		class Bar {
			componentWillUpdate() { ok(true, 'componentWillUpdate#Composite') }
			componentDidUpdate() { ok(true, 'componentDidUpdate#Composite') }
			render() { return h('h1', this.props.id) }
		}

		class Foo {
			componentWillMount() { ok(true, 'componentWillMount') }
			componentDidMount() { ok(true, 'componentDidMount') }
			componentWillUpdate() { ok(true, 'componentWillUpdate') }
			componentDidUpdate() { ok(true, 'componentDidUpdate') }
			componentWillReceiveProps() { ok(true, 'componentWillReceiveProps') }
			componentWillUnmount() { ok(true, 'componentWillUnmount') }
			shouldComponentUpdate() { ok(true, 'shouldComponentUpdate') }
			render() { return Bar }
		}

		render(h(Foo, {id: 1}), container)
		render(h(Foo, {id: 1}), container)
		render(null, container)

		var stages = []
		var counter = 0

		class A {
			componentWillUnmount() {stages.push('0')}
			render(){}
		}

		class B {
			componentDidUpdate() {stages.push('5')}
			componentWillUpdate(nextProps, nextState) {stages.push('4')}
			shouldComponentUpdate() {stages.push('3')}
			componentWillReceiveProps() {stages.push('2')}
			componentWillMount() {stages.push('1')}
			render(){}
		}

		class C {
			shouldComponentUpdate({update}){
				return update
			}
			render() {
				return ++counter
			}
		}

		render(A, container)
		render(B, container)
		render(B, container)

		ok(stages.join('') === '012345', 'Will/DidMount, ReceiveProps, shouldUpdate, Will/Didupdate, WillUnmount')

		render(h(C, {update: false}), container)
		render(h(C, {update: false}), container)
		ok(compare(container, '1'), 'shouldComponentUpdate(false)')

		render(h(C, {update: true}), container)
		ok(compare(container, '2'), 'shouldComponentUpdate(true)')

		end()
	})

	test('Constructor', ({ok, end}) => {
		var container = document.createElement('div')

		class A extends Component {
			constructor() {super()}
			render() {return h('h1', this.props.value)}
		}

		class B extends Component {
			constructor(props) {super(props)}
			render() {return h('h1', this.props.value)}
		}

		render(h(A, {value: 'Hello'}), container)
		ok(compare(container, '<h1>Hello</h1>'), 'super(props)')

		render(h(B, {value: 'Hello'}), container)
		ok(compare(container, '<h1>Hello</h1>'), 'super()')

		end()
	})

	test('Error Boundaries', ({ok, end}) => {
		var container = document.createElement('div')

		class A {
			componentDidCatch(error) {
				error.report = !ok(true, 'componentDidCatch')
				return error.message
			}
			render() {
				throw 'render'
			}
		}

		render(A, container)
		ok(compare(container, 'render'), 'componentDidCatch#render')

		end()
	})

	test('PureComponent', ({ok, end}) => {
		var container = document.createElement('div')
		var counter = 0

		class A extends PureComponent {
			render () {
				return h('div', counter++)
			}
		}

		render(h(A, {id: 1}), container)
		render(h(A, {id: 1}), container)
		ok(compare(container, '<div>0</div>'), 'shouldComponentUpdate(false)')
		render(h(A, {id: 2}), container)
		ok(compare(container, '<div>1</div>'), 'shouldComponentUpdate(true)')
		end()
	})
}
