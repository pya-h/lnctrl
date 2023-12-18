import HurwitzCriterionLecture from "./lecture";
import { Grid, InputAdornment, TextField } from "@mui/material";
import HurwitzCriterionSolveBox from "./solve";
import { MathJax } from "better-react-mathjax";
import { gridSpacing } from "store/constant";
import { stringToArray } from "math/calculus";
import TopicBaseComponent from "views/topics/TopicBaseComponent";
class HurwitzCriterion extends TopicBaseComponent {
	state = { rawInput: "", a_i: [], topicKey: "ch4-hw" };

	// no need for now:
	/*componentDidUpdate(prevProps, prevState) {
		const { rawInput } = this.state;
		if (rawInput !== prevState.rawInput) {
			this.$a_i(stringToArray(rawInput));
		}
	}*/
//
	$a_i = (value) => {
		this.setState((state) => {
			state.a_i = value;
			return state;
		});
		// this.setState({...this.state, a_i:value});

	}
	$rawInput = (value) => {
	// 	this.setState((state) => {
	// 		state.rawInput = value;
	// 		return state;
	// 	});
		this.setState({rawInput:value, a_i: stringToArray(value)});
	};

	render() {
		const { a_i, rawInput } = this.state;

		return (
			<Grid container direction="column" spacing={gridSpacing}>
				<Grid
					style={{
						width: "100%",
						height: "100%",
						margin: "auto",
						direction: "ltr",
					}}
					item
				>
					<HurwitzCriterionLecture />
				</Grid>

				<Grid
					spacing={gridSpacing}
					style={{
						width: "100%",
						height: "100%",
						margin: "auto",
						marginTop: "1%",
						direction: "ltr",
					}}
					container
				>
					<Grid xs={12} item>
						<TextField
							onChange={(e) => this.$rawInput(e.target.value)}
							value={rawInput}
							style={{ width: "100%" }}
							sx={{ px: 1 }}
							InputProps={{
								startAdornment: (
									<InputAdornment position="left">
										<MathJax>
											{
												"$$\\Delta(s) = \\Sigma \\lgroup$$"
											}
										</MathJax>
									</InputAdornment>
								),
								endAdornment: (
									<InputAdornment position="right">
										<MathJax>{"$$ \\rgroup s^i$$"}</MathJax>
									</InputAdornment>
								),
							}}
						/>
					</Grid>
					<hr />
					<Grid xs={12} item>
						<HurwitzCriterionSolveBox a_i={a_i} />
					</Grid>
				</Grid>
			</Grid>
		);
	}
}

export default HurwitzCriterion;
