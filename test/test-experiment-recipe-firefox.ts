import { typeGuards } from "..";
import { assert } from "chai";

const TEST_EXPERIMENT = {
  id: "ABOUTWELCOME-PULL-FACTOR-REINFORCEMENT-76-RELEASE",
  enabled: true,
  arguments: {
    slug: "bug-1637316-message-aboutwelcome-pull-factor-reinforcement-76-rel-release-76-77",
    platform: "firefox-desktop",
    userFacingName: "About:Welcome Pull Factor Reinforcement",
    userFacingDescription:
      "4 branch experiment different variants of about:welcome with a goal of testing new experiment framework and get insights on whether reinforcing pull-factors improves retention. Test deployment of multiple branches using new experiment framework",
    isEnrollmentPaused: true,
    active: true,
    bucketConfig: {
      randomizationUnit: "normandy_id",
      namespace: "bug-1637316-message-aboutwelcome-pull-factor-reinforcement-76-rel-release-76-77",
      start: 0,
      count: 2000,
      total: 10000,
    },
    startDate: "2020-07-01T11:04:42z",
    endDate: null,
    proposedDuration: 28,
    proposedEnrollment: 7,
    referenceBranch: "control",
    features: [],
    branches: [
      {
        slug: "control",
        ratio: 1,
        value: {},
      },
      {
        slug: "treatment-variation-b",
        ratio: 1,
        value: {},
      },
    ],
  },
};

describe("experiment schemas", () => {
  it("should validate an existing onboarding experiment", async () => {
    typeGuards.experiments_assertExperimentRecipe(TEST_EXPERIMENT);
  });
  it("should fail on a non-ISO date", async () => {
    const result = typeGuards.experiments_checkExperiment({
      ...TEST_EXPERIMENT.arguments,
      startDate: "foo",
    });
    assert.equal(result.ok, false, "validation should fail");
    assert.propertyVal(result.errors[0], "message", 'should match format "date-time"');
  });
});
