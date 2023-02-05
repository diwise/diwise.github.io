+++
archetype = "chapter"
title = "Deployment"
url = "deployment"
weight = 5
menuPre = "<i class='fas fa-cloud'></i> "
+++

## Introduction

The recommended way to customize and install diwise in your own environment is to create an installation manifest using kustomize, that can then be applied to your kubernetes cluster using a tool such as kubectl or oc.

In this chapter we will be walking through a basic setup, from creating the first skeleton manifest, to configuring secrets, to deployment into a test cluster. Lets go!

## Requirements

First, we need to make sure that we have gone over the prerequisites for installation. Diwise is a containerized platform, that is primarily meant to be deployed to some form of kubernetes.

### Kubernetes Environment

In this walk through we will be setting up a local kubernets cluster that can be used to verify our installation. Adapting the instructions to real test or production clusters is left as an exercise to the reader, due to the massive amount of different possible configurations out there.

**TODO:** Document how to set up a local test cluster in different environments

### Tools

Download and install the [kustomize](https://kustomize.io) command line tool from https://kubectl.docs.kubernetes.io/installation/kustomize/

## Creating our first manifest

Start by creating a new folder containing a file named kustomization.yaml. We recommend that you keep your configuration in a version control system, such as git, to improve the traceability and auditability of your configuration.

Edit kustomization.yaml to look like this:

```yaml
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization

# Change this to something more appropriate
namespace: my-own-diwise

resources:
- ssh://github.com/diwise/diwise/deployments/k8s?depth=1
```

This bare minimum file instructs kustomize to pull the latest released diwise manifest from github, and overlay each resource with the namespace you intend to deploy diwise into.

Create your first, noy yet fully functional, installation manifest with the following command:

```bash
kustomize build . > installation-manifest.yaml
```

If this command succeeds and creates a non empty manifest file, we are all set to continue setting up the rest of the platform. But that is an exercise for another episode. Come back soon!
