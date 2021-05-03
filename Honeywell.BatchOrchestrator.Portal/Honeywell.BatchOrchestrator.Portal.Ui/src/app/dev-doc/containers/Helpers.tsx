import React from 'react';
import { Button, Card } from '@scuf/common';

const minWidth = 0;
const maxWidth = 360;
const maxFontSizes = 20;
const Helpers = () => {
  return (
    <>
      <h5>Helpers</h5>
      <div className="column">
        <div className="mb-4 d-flex justify-content-space-between">
          <Card className="m-0 mr-4 p-4">
            {/* <Card.Header title="Font sizes" /> */}
            <Card.Content className="border">
              <h5>Font sizes</h5>
              <div className="mb-2">
                <span className="mr-1 badge badge-primary">px</span>
                <span>
                  1px <span className="text-bold text-success"> to </span> 120px
                </span>
              </div>
              <div className="mb-2">
                <span className="mr-1 badge badge-secondary">Step</span>
                <span>1px</span>
              </div>
              <div>
                <span className="mr-1 badge badge-success">Classes</span>
                <span>
                  font-size-1{' '}
                  <span className="text-bold text-success"> to </span>
                  font-size-120
                </span>
                <div>
                  <span className="font-size-12">font-size-12: 12px</span>,
                  <span className="font-size-25">font-size-25: 25px</span>
                </div>
              </div>
            </Card.Content>
          </Card>

          <Card className="m-0 p-4">
            {/* <Card.Header title="Font sizes" /> */}
            <Card.Content className="border">
              <h5>Font sizes</h5>
              <div className="mb-2">
                <span className="mr-1 badge badge-primary">rem</span>
                <span>
                  {(1 / 2) * 0.25}rem
                  <span className="text-bold text-success"> to </span>
                  {(120 / 2) * 0.25}rem
                </span>
              </div>
              <div className="mb-2">
                <span className="mr-1 badge badge-secondary">Step</span>
                <span>Multiples of 0.125</span>
              </div>
              <div>
                <span className="mr-1 badge badge-success">Classes</span>
                <span>
                  font-size-l1-rem
                  <span className="text-bold text-success"> to </span>
                  font-size-l120-rem
                </span>
                <div>
                  <span className="font-size-l7-rem">
                    font-size-l7-rem: {7 * 0.5 * 0.25}rem
                  </span>
                  ,
                  <span className="font-size-l8-rem">
                    font-size-l8-rem: {8 * 0.5 * 0.25}rem
                  </span>
                </div>
              </div>
            </Card.Content>
          </Card>
        </div>

        <div className="d-flex justify-content-space-between">
          <Card className="m-0 mr-4 p-4">
            {/* <Card.Header title="Widths and Heights" /> */}
            <Card.Content className="border">
              <h5>Widths and Heights</h5>
              <div className="mb-2">
                <span className="mr-1 badge badge-primary">px, em, rem</span>
                <span>
                  0px <span className="text-bold text-success"> to </span> 720px
                  | 0em <span className="text-bold text-success"> to </span>{' '}
                  180em | 0rem
                  <span className="text-bold text-success"> to</span> 180rem
                </span>
              </div>
              <div className="mb-2">
                <span className="mr-1 badge badge-secondary">Step</span>
                <span>2px | 0.5em | 0.5rem</span>
              </div>
              <div>
                <span className="mr-1 badge badge-success">Classes</span>
                <div>
                  <span className="text-bold text-success">width</span>: width-1
                  | width-l1-em | width-l1-rem
                  <span className="text-bold text-success"> to </span> width-720
                  | width-l360-em | width-l360-rem
                </div>
                <div>
                  <span className="text-bold text-success">min-width</span>:
                  min-width-1 | min-width-l1-em | min-width-l1-rem
                  <span className="text-bold text-success"> to </span>
                  min-width-720 | min-width-l360-em | min-width-l360-rem
                </div>
                <div>
                  <span className="text-bold text-success">max-width</span>:
                  max-width-1 | max-width-l1-em | max-width-l1-rem
                  <span className="text-bold text-success"> to </span>
                  max-width-720 | max-width-l360-em | max-width-l360-rem
                </div>
                <div>
                  <span className="text-bold text-success">width-clamped</span>:
                  width-clamped-1 | width-clamped-l1-em | width-clamped-l1-rem
                  <span className="text-bold text-success"> to </span>
                  width-clamped-720 | width-clamped-l360-em |
                  width-clamped-l360-rem
                </div>
                <div>
                  <span className="mr-1 mt-1 badge badge-secondary w-180">
                    w-180 &gt; width: 180px
                  </span>
                  <span className="mr-1 mt-1 badge badge-secondary w-l30-em">
                    w-l30-em &gt; width: 15em
                  </span>
                  <span className="mt-1 badge badge-secondary w-l30-rem">
                    w-l30-rem &gt; width: 15rem
                  </span>
                </div>
              </div>
              <div className="mt-2 h-clamped-40 line-height-sm alert alert-primary">
                All width classes have same counterparts for height also. Just
                replace w prefix with h e.g. w-100-p with h-100-p.
              </div>
            </Card.Content>
          </Card>

          <Card className="m-0 p-4">
            {/* <Card.Header title="Widths and Heights" /> */}
            <Card.Content className="border">
              <h5>Widths and Heights</h5>
              <div className="mb-2">
                <span className="mr-1 badge badge-primary">%, vw, vh</span>
                <span>
                  0px <span className="text-bold text-success"> to </span> 720px
                  | 0em <span className="text-bold text-success"> to </span>{' '}
                  180em | 0rem
                  <span className="text-bold text-success"> to</span> 180rem
                </span>
              </div>
              <div className="mb-2">
                <span className="mr-1 badge badge-secondary">Step</span>
                <span>2px | 0.5em | 0.5rem</span>
              </div>
              <div>
                <span className="mr-1 badge badge-success">Classes</span>
                <div>
                  <span className="text-bold text-success">width</span>: width-1
                  | width-l1-em | width-l1-rem
                  <span className="text-bold text-success"> to </span> width-720
                  | width-l360-em | width-l360-rem
                </div>
                <div>
                  <span className="text-bold text-success">min-width</span>:
                  min-width-1 | min-width-l1-em | min-width-l1-rem
                  <span className="text-bold text-success"> to </span>
                  min-width-720 | min-width-l360-em | min-width-l360-rem
                </div>
                <div>
                  <span className="text-bold text-success">max-width</span>:
                  max-width-1 | max-width-l1-em | max-width-l1-rem
                  <span className="text-bold text-success"> to </span>
                  max-width-720 | max-width-l360-em | max-width-l360-rem
                </div>
                <div>
                  <span className="text-bold text-success">width-clamped</span>:
                  width-clamped-1 | width-clamped-l1-em | width-clamped-l1-rem
                  <span className="text-bold text-success"> to </span>
                  width-clamped-720 | width-clamped-l360-em |
                  width-clamped-l360-rem
                </div>
                <div>
                  <span className="mr-1 mt-1 badge badge-secondary w-180">
                    w-180 &gt; width: 180px
                  </span>
                  <span className="mr-1 mt-1 badge badge-secondary w-l30-em">
                    w-l30-em &gt; width: 15em
                  </span>
                  <span className="mt-1 badge badge-secondary w-l30-rem">
                    w-l30-rem &gt; width: 15rem
                  </span>
                </div>
              </div>
              <div className="mt-2 h-clamped-40 line-height-sm alert alert-primary">
                All width classes have same counterparts for height also. Just
                replace w prefix with h e.g. w-100-p with h-100-p.
              </div>
            </Card.Content>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Helpers;
