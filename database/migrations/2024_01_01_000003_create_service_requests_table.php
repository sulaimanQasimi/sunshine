<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('service_requests', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('service_id')->constrained()->onDelete('cascade');
            $table->enum('status', ['pending', 'approved', 'in_progress', 'completed', 'cancelled'])->default('pending');
            $table->decimal('base_price', 10, 2);
            $table->decimal('total_price', 10, 2);
            $table->json('selected_additional_items')->nullable();
            $table->text('description')->nullable();
            
            // Client Information
            $table->string('client_name');
            $table->string('client_email');
            $table->string('client_phone');
            $table->text('client_address');
            $table->string('house_number')->nullable();
            $table->string('city');
            $table->string('state');
            $table->string('postal_code');
            $table->string('country')->default('USA');
            
            // Service Details
            $table->date('preferred_date');
            $table->time('preferred_time');
            $table->text('special_requirements')->nullable();
            $table->text('additional_notes')->nullable();
            
            // Confirmation
            $table->boolean('client_confirmed')->default(false);
            $table->timestamp('confirmed_at')->nullable();
            
            // Admin Notes
            $table->text('admin_notes')->nullable();
            $table->foreignId('assigned_to')->nullable()->constrained('users')->onDelete('set null');
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('service_requests');
    }
};
