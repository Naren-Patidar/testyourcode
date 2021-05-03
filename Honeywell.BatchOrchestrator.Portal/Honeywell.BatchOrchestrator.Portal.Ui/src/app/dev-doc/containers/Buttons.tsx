import React from 'react';
import { Button, Card } from '@scuf/common';

const Buttons = () => {
  return (
    <>
      <div>Display Flex - Space Between</div>
      <div className="d-flex justify-content-space-between">
        <div className="column">
          <Card>
            <Card.Header title=".column" />
            <Card.Content>
              <Card>
                <Card.Header title="Primary Button - States" />
                <Card.Content>
                  <Button
                    type="primary"
                    content="Sample Text"
                    className="my-2"
                  />
                  <Button
                    type="primary"
                    content="Sample Text Hover"
                    className="focus my-2"
                  />
                  <Button
                    type="primary"
                    content="Sample Text Active"
                    className="my-2"
                    active
                  />
                  <Button
                    type="primary"
                    content="Sample Text Disabled"
                    className="my-2"
                    disabled
                  />
                </Card.Content>
              </Card>

              <Card>
                <Card.Header title="Primary Button - Sizes" />
                <Card.Content>
                  <Button
                    type="primary"
                    size="small"
                    content="Sample Text - Small"
                    className="my-2"
                  />
                  <Button
                    type="primary"
                    size="medium"
                    content="Sample Text - Medium"
                    className="my-2"
                  />
                  <Button
                    type="primary"
                    className="large my-2"
                    content="Sample Text - Large"
                  />
                </Card.Content>
              </Card>
            </Card.Content>
          </Card>
        </div>

        <div className="column">
          <Card>
            <Card.Header title=".column" />
            <Card.Content>
              <Card>
                <Card.Header title="Secondary Button - States" />
                <Card.Content>
                  <Button
                    type="secondary"
                    content="Sample Text"
                    className="my-2"
                  />
                  <Button
                    type="secondary"
                    content="Sample Text Hover"
                    className="focus my-2"
                  />
                  <Button
                    type="secondary"
                    content="Sample Text Active"
                    className="my-2"
                    active
                  />
                  <Button
                    type="secondary"
                    content="Sample Text Disabled"
                    className="my-2"
                    disabled
                  />
                </Card.Content>
              </Card>

              <Card>
                <Card.Header title="Secondary Button - Sizes" />
                <Card.Content>
                  <Button
                    type="secondary"
                    size="small"
                    content="Sample Text - Small"
                    className="my-2"
                  />
                  <Button
                    type="secondary"
                    size="medium"
                    content="Sample Text - Medium"
                    className="my-2"
                  />
                  <Button
                    type="secondary"
                    className="large my-2"
                    content="Sample Text - Large"
                  />
                </Card.Content>
              </Card>
            </Card.Content>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Buttons;
