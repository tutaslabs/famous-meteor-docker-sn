# Basic Ubuntu and Docker setup Vagrantfile
#
# Weave Getting Started Guides
#

require 'fileutils'
require 'ipaddr'

Vagrant.require_version ">= 1.6.0"

VAGRANTFILE_API_VERSION = "2"
CONFIG = File.join(File.dirname(__FILE__), "config.rb")

ENV['VAGRANT_DEFAULT_PROVIDER'] = 'virtualbox'

# Defaults for config options defined in CONFIG
#

$num_instances = 1
$instance_name_prefix = "docker-sn"
$share_home = false
$vm_gui = false
$vm_memory = 512
$vm_cpus = 1
$vm_starting_ip = "192.168.1.40"

$vm_ip = $vm_starting_ip

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
    config.vm.box = "ubuntu/trusty64"
    config.ssh.insert_key = true

    if Vagrant.has_plugin?("vagrant-cachier")
        config.cache.scope = :box
    end
 
    (1..$num_instances).each do |i|
    
        config.vm.define vm_name = "%s-%02d" % [$instance_name_prefix, i] do |config|
            config.vm.hostname = vm_name
            ip = IPAddr.new($vm_ip)
            $vm_ip = ip.succ.to_s
            config.vm.network "public_network", ip: $vm_ip
        end
    end

    config.vm.provider :virtualbox do |vb|
        vb.gui = $vm_gui
        vb.memory = $vm_memory
        vb.cpus = $vm_cpus
    end

    config.vm.provision "docker" do |d|
        d.pull_images "ubuntu"

    end
    
    config.vm.provision "shell", privileged: true, inline: <<-SHELL
#        sudo wget -O /usr/local/bin/weave https://github.com/zettio/weave/releases/download/latest_release/weave
#        sudo chmod a+x /usr/local/bin/weave
	 sudo curl -sSL https://github.com/docker/compose/releases/download/1.1.0/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose
	 sudo chmod +x /usr/local/bin/docker-compose


    SHELL

end
