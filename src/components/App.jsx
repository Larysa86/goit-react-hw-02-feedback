import { FeedbackOptions, Statistics, Section, Notification } from './index';
import React, { Component } from 'react';


export class App extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  onLeaveFeedback = key => {
    this.setState(prevState => ({ [key]: prevState[key] + 1 }));
  };

  totalFeedback = (a, b, c) => a + b + c;

  positiveFeedbackPercentage = (positiveRating, totalRating) =>
    totalRating ? Math.ceil((positiveRating / totalRating) * 100) : 0;

  render() {
    const { good, neutral, bad } = this.state;
    const total = this.totalFeedback(good, neutral, bad);
    const positivePercentage = this.positiveFeedbackPercentage(
      good,
      total
    );

    return (
      <div>
        <Section title="Please leave feedback">
          <FeedbackOptions
            options={['good', 'neutral', 'bad']}
            onLeaveFeedback={this.onLeaveFeedback}
          />
        </Section>

        <Section title="Statistics">
          {total ? (
            <Statistics
              good={good}
              neutral={neutral}
              bad={bad}
              total={total}
              positivePercentage={positivePercentage}
            />
          ) : (
            <Notification message="There is no feedback" />
          )}
        </Section>
      </div>
    );
  }
}
